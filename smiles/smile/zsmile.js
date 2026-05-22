/* ==========================================================================
   ZSMILE.JS - Controlador Centralizado y Reutilizable de Datos
   ========================================================================== */

import { db } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getls, savels, removels } from '../widev.js';

// --- OBTENER MES ACTUAL (FORMATO YYYY-MM) ---
export const getMesActual = () => {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
};

// --- CARGAR TOURS CON CACHE INTELIGENTE DE 5 HORAS ---
export const cargarTours = async () => {
  try {
    const cache = getls('toursSmile');
    if (cache?.length > 0) {
      return cache.map(t => ({
        nt: t.num || Math.random(),
        tour: t.tour,
        price: parseFloat(t.precio) || 0,
        pts: parseInt(t.puntos) || 0,
        com: parseFloat(t.comision) || 5
      }));
    }

    const snap = await getDocs(query(collection(db, 'listatours'), where('activo', '==', true)));
    if (snap.empty) return [];

    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    savels('toursSmile', data, 5); // Cache por 5 horas

    return data.map(t => ({
      nt: t.num || Math.random(),
      tour: t.tour,
      price: parseFloat(t.precio) || 0,
      pts: parseInt(t.puntos) || 0,
      com: parseFloat(t.comision) || 5
    }));
  } catch (error) {
    console.error('Error en cargarTours (zsmile):', error);
    return [];
  }
};

// --- CARGAR TODOS LOS EMPLEADOS (cache-first) ---
// soloParticipantes=true → where('participa','==','si')
export const cargarTodosEmpleados = async (soloParticipantes = false) => {
  const key = soloParticipantes ? 'todosEmpleadosSmile' : 'rrhhUsuarios';
  const ttl = soloParticipantes ? 60 : 30;

  const cached = getls(key);
  if (cached) return cached;

  const q = soloParticipantes
    ? query(collection(db, 'smiles'), where('participa', '==', 'si'))
    : collection(db, 'smiles');

  const snap = await getDocs(q);
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  data.sort((a, b) => (a.nombre || a.usuario || '').localeCompare(b.nombre || b.usuario || '', 'es'));
  savels(key, data, ttl);
  return data;
};

// --- CARGAR TOURS RAW (todos, incluyendo inactivos — para gestor/precios) ---
export const cargarToursRaw = async () => {
  const key = 'toursRawSmile';
  const cached = getls(key);
  if (cached) return cached;

  const snap = await getDocs(collection(db, 'listatours'));
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  data.sort((a, b) => (a.num || 999) - (b.num || 999));
  savels(key, data, 2); // Cache corto: 2 horas
  return data;
};

// --- INVALIDAR CACHE DE TOURS ---
export const invalidateTourCache = () => {
  removels('toursSmile', 'toursRawSmile');
  console.log('🧹 Cache de tours invalidado');
};

// --- INVALIDAR CACHE DE EMPLEADOS ---
export const invalidateEmpleadosCache = () => {
  removels('rrhhUsuarios', 'todosEmpleadosSmile');
  console.log('🧹 Cache de empleados invalidado');
};

// --- NORMALIZAR ROL ---
export const normalizarRol = (rol) => {
  const validos = ['smile', 'gestor', 'empresa', 'admin'];
  const r = (rol || 'smile').toLowerCase();
  return validos.includes(r) ? r : 'smile';
};

// --- NORMALIZAR ESTADO ---
export const normalizarEstado = (estado) => {
  const validos = ['activo', 'pendiente', 'suspendido', 'inactivo'];
  const e = (estado || 'activo').toLowerCase();
  return validos.includes(e) ? e : 'activo';
};

// --- VALIDAR NÚMERO MONETARIO ---
export const esMoneda = (val) => {
  const n = parseFloat(val);
  return !isNaN(n) && n >= 0;
};

// --- CALCULAR Y OBTENER RANKING COMPLETO DEL MES ---
export const obtenerRankingMes = async (mes) => {
  try {
    const cacheKey = `empleadosPuntos_${mes}`;
    const cached = getls(cacheKey);
    if (cached) {
      console.log(`🏆 Ranking del mes ${mes} recuperado de caché local.`);
      return cached;
    }

    console.log(`🔄 Calculando ranking en vivo desde Firestore para el mes ${mes}...`);

    // 1. Obtener colaboradores que participan
    const empSnap = await getDocs(query(collection(db, 'smiles'), where('participa', '==', 'si')));
    const empleados = empSnap.docs.map(d => {
      const data = d.data();
      return {
        usuario: data.usuario || d.id,
        nombre: data.nombre || data.usuario || d.id,
        descripcion: data.descripcion || 'Colaborador',
        imagen: data.imagen || '',
        totalPuntos: 0,
        totalVentas: 0
      };
    });

    // 2. Obtener todas las ventas registradas
    const snap = await getDocs(collection(db, 'registrosdb'));
    const [yr, mm] = mes.split('-').map(Number);

    // 3. Procesar las ventas en memoria
    snap.docs.forEach(d => {
      const v = d.data();
      const f = v.fechaTour;
      let a, m;

      if (typeof f === 'string') {
        [a, m] = f.split('-').map(Number);
      } else if (f?.toDate) {
        const fd = f.toDate();
        a = fd.getFullYear();
        m = fd.getMonth() + 1;
      } else {
        return;
      }

      if (a === yr && m === mm) {
        const emp = empleados.find(e => e.usuario === v.vendedor);
        if (emp) {
          emp.totalPuntos += parseInt(v.puntos) || 0;
          emp.totalVentas += parseInt(v.qventa) || 1;
        }
      }
    });

    // 4. Ordenar: 1ro Puntos (Desc), 2do Ventas (Desc), 3ro Nombre (Asc)
    empleados.sort((a, b) => {
      if (b.totalPuntos !== a.totalPuntos) return b.totalPuntos - a.totalPuntos;
      if (b.totalVentas !== a.totalVentas) return b.totalVentas - a.totalVentas;
      return a.nombre.localeCompare(b.nombre);
    });

    // 5. Guardar en caché local por 5 horas
    savels(cacheKey, empleados, 5);
    return empleados;
  } catch (error) {
    console.error('Error en obtenerRankingMes (zsmile):', error);
    return [];
  }
};

// --- INVALIDAR CACHÉS ANTE CAMBIOS O REGISTROS ---
export const invalidateRankingCaches = (vendedor, mes) => {
  console.log(`🧹 Invalidando cachés de ranking y KPIs para ${vendedor} en el mes ${mes}`);
  removels(
    'topSmiles',
    'todasVentasSmile',
    'todosEmpleadosSmile',
    'svVentas',
    `empleadosPuntos_${mes}`,
    `resumenMes_${mes}`,
    `kpiSmile_${vendedor}_${mes}`,
    `ventasSmile_${vendedor}_${mes}`
  );
};

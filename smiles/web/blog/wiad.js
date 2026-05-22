import $ from 'jquery';

if (!$('#wiad_styles').length) {
  $('<style id="wiad_styles">').text(`
    .wi_ad_link { max-width:300px; }
    .wi_ad_link:hover { opacity:1!important; transform:scale(1.01); }
    .wi_ad_img { margin-block:4vh 2vh; }
  `).appendTo('head');
}

export const adLeft = `
  <div class="lc_ad_side lc_ad_l">
    <a href="https://lovewi.web.app/" target="_blank" class="lc_ad_box wi_ad_link">
      <img src="${import.meta.env.BASE_URL}Img0.webp" alt="Ad Left" class="wi_ad_img" />
    </a>
  </div>
`;

export const adRight = `
  <div class="lc_ad_side lc_ad_r">
    <a href="https://wtaype.me/" target="_blank" class="lc_ad_box wi_ad_link">
      <img src="https://typingwii.web.app/Img1.webp" alt="Ad Right" class="wi_ad_img" />
    </a>
  </div>
`;

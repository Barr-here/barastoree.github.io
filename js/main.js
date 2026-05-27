  // 々  Theme
  const btn = document.getElementById('themeBtn');
    
  // load theme tersimpan
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = '☀️';
  } else {
    btn.textContent = '🌙';
  }

  // toggle theme
  btn.onclick = () => {
    document.body.classList.toggle('dark');
    const dark = document.body.classList.contains('dark');
    btn.textContent = dark ? '☀️' : '🌙';
    
    // simpan theme
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };
  
  // popup theme
  const themePopup = document.getElementById('themePopup');
  function showThemePopup() {
    if (document.body.classList.contains('dark')) return;

    themePopup.classList.add('show');
    setTimeout(() => {
      themePopup.classList.remove('show');
    }, 4000);
  }
  
  setTimeout(showThemePopup, 2000);
  setInterval(showThemePopup, 15000);
  
  // 々 Search 
  const searchInput = document.getElementById('searchInput');
  const countBadge = document.getElementById('countBadge');
  
  function initSearch() {
    const cards = document.querySelectorAll('.card');
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      let visible = 0;
      cards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        const methods = [...card.querySelectorAll('.method-tag')]
          .map(v => v.textContent)
          .join(' ');
        const text = (card.textContent + name + methods).toLowerCase();
        const match = !q || text.includes(q);
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });
       countBadge.textContent = visible + ' Kategori' + (visible !== 1 ? 's' : '');
    });
  }

  const qrisPopup = 
    document.getElementById('qrisPopup');
  const openQris =
    document.getElementById('openQris');
  const closeQris =
    document.getElementById('closeQris');
  openQris.onclick = () => {
    qrisPopup.classList.add('show');
  };

  closeQris.onclick = () => {
    qrisPopup.classList.remove('show');
  };

  qrisPopup.onclick = (e) => {
    if (e.target === qrisPopup) {
      qrisPopup.classList.remove('show');
    }
  };
  
  const openTags = document.getElementById('openTags');
  const tagsPopup = document.getElementById('tagsPopup');
  const tagsOverlay = document.getElementById('tagsOverlay');
  const tagsList = document.getElementById('tagsList');
 
  function initTags() {
    const allTags = new Set();

    document.querySelectorAll('.method-tag').forEach(tag => {
      const text = tag.textContent.trim();
      if (text) allTags.add(text);
    });

    allTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-btn';
      btn.textContent = tag;
      btn.onclick = () => {
        searchInput.value = tag;
        searchInput.dispatchEvent(new Event('input'));
        tagsPopup.classList.remove('show');
        tagsOverlay.classList.remove('show');
        document.body.style.overflow = '';
      };
      
      tagsList.appendChild(btn);
    });
  }

  openTags.onclick = () => {
    tagsPopup.classList.add('show');
    tagsOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  tagsOverlay.onclick = () => {
    tagsPopup.classList.remove('show');
    tagsOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  const greetingText =
    document.getElementById('greetingText');

  function updateGreeting() {
    const now = new Date();

    const jam = now.getHours()
      .toString()
      .padStart(2, '0');

    const menit = now.getMinutes()
      .toString()
      .padStart(2, '0');

    const detik = now.getSeconds()
      .toString()
      .padStart(2, '0');

    let greeting = '';
    if (jam >= 4 && jam < 11) {
      greeting = 'Selamat pagi🌤️';
    } else if (jam >= 11 && jam < 15) {
      greeting = 'Selamat siang☀️';
    } else if (jam >= 15 && jam < 18) {
      greeting = 'Selamat sore🌥️';
    } else {
      greeting = 'Selamat malam🌙';
    }

    greetingText.innerHTML = `
      ${greeting}
      <br>
      <span style="
        font-size:13px;
        color: var(--subtext);
        font-family: var(--mono);
      ">
        Time : ${jam}:${menit}:${detik}
      </span>
    `;

  }

  updateGreeting();
  setInterval(updateGreeting, 1000);

  // 々  POPUP COPY
  const popup = document.getElementById('copyPopup');

  function showPopup(text, type = 'success') {
    popup.textContent = text;
    popup.className = 'copy-popup show ' + type;
    clearTimeout(window.popupTimeout);
    window.popupTimeout = setTimeout(() => {
      popup.classList.remove('show');
    }, 2200);
  }

  document.querySelectorAll('.copy-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const url = card.getAttribute('data-copy');

    // Gunakan Clipboard API modern
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url)
        .then(() => {
          showPopup('✅ Tautan berhasil disalin', 'success');
        })
        .catch(() => {
          showPopup('‼️ Gagal menyalin tautan', 'error');
        });
    } else {
      // Fallback untuk file:// atau browser lama
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      input.setSelectionRange(0, 99999);
      const copied = document.execCommand('copy');
      document.body.removeChild(input);
      if (copied) {
        showPopup('✅ Tautan berhasil disalin', 'success');
      } else {
        showPopup('‼️ Gagal menyalin tautan', 'error');
      }
    }
  });
});

  // 々  Memuat Banner
  const bannerTrack = document.getElementById('bannerTrack');
  const bannerPopupOverlay = document.getElementById('bannerPopupOverlay');
  const popupTitle = document.getElementById('popupTitle');
  const popupWa = document.getElementById('popupWa');
  const popupTele = document.getElementById('popupTele');

  fetch('database/banners.json')
    .then(r => r.json())
    .then(banners => {
      banners.forEach(item => {
        bannerTrack.innerHTML += `
          <div
            class="banner-card"
            data-title="${item.title}"
            data-wa="${item.wa}"
            data-tele="${item.tele}"
          >
            <div class="banner-image-wrap">
              <img
                class="banner-image"
                src="${item.image}"
                alt="${item.title}"
                loading="lazy"
                draggable="false"
              >
            </div>
            <div class="banner-content">
              <div class="banner-title">${item.title}</div>
              <div class="banner-desc">${item.desc}</div>
            </div>
          </div>
        `;
      });
      document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.banner-card')) {
          e.preventDefault();
        }
      });
      
      // 々  Auto Scroll
      let autoScroll = setInterval(() => {
        bannerTrack.scrollBy({ left: 260, behavior: 'smooth' });
        if (
          bannerTrack.scrollLeft + bannerTrack.clientWidth >=
          bannerTrack.scrollWidth - 10
        ) {
          bannerTrack.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 5000);

      // 々  Buka Popup
      document.querySelectorAll('.banner-card').forEach(card => {
        card.addEventListener('click', () => {
          popupTitle.textContent = card.dataset.title;
          popupWa.href = card.dataset.wa;
          popupTele.href = card.dataset.tele;
          bannerPopupOverlay.classList.add('show');
          document.body.style.overflow = 'hidden';
        });
      });

      bannerPopupOverlay.addEventListener('click', (e) => {
        if (e.target === bannerPopupOverlay) {
          bannerPopupOverlay.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    });
    
    // 々  Memuat Produk
    const endpointList = document.getElementById('endpointList');
    
    fetch('database/products.json')
      .then(r => r.json())
      .then(products => {
        products.forEach(item => {
          endpointList.innerHTML += `
            <div class="card expandable" data-name="${item.type.toLowerCase()}">
              <div class="card-top">
                <div class="methods">
                  <span class="method-tag product">${item.type}</span>
                </div>
                <span class="chevron">›</span>
              </div>
              <div class="endpoint-path">${item.title}</div>
              <div class="endpoint-desc">${item.desc}</div>
              <div class="expand-content">
                <div class="expand-box">
                  <div class="expand-buttons">
                    <a class="expand-btn wa" href="${item.wa}" target="_blank">WhatsApp</a>
                    <a class="expand-btn tele" href="${item.tele}" target="_blank">Telegram</a>
                  </div>
                  <div class="expand-footer">${item.content}</div>
                </div>
              </div>
            </div>
          `;
        });

        document.querySelectorAll('.expandable').forEach(card => {
          card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            document.querySelectorAll('.expandable').forEach(other => {
            if (other !== card) other.classList.remove('active');
          });
          card.classList.toggle('active');
        });
      });

      // init search & tags setelah semua card selesai
      initSearch();
      initTags();

      const allCards = document.querySelectorAll('.card');
      countBadge.textContent = allCards.length + ' Kategori' + (allCards.length !== 1 ? 's' : '');
    });
    
    // 々  Memuat Testimoni
    const testiSlider = document.getElementById('testiSlider');
    fetch('database/testimonials.json')
      .then(r => r.json())
      .then(testimonials => {
        testimonials.forEach(item => {
          testiSlider.innerHTML += `
            <div class="testi-card">
              <img
                class="testi-img"
                src="${item.image}"
                loading="lazy"
                draggable="false"
              >
              <div class="testi-content">
                <div class="testi-meta">
                <div class="testi-date">${item.date}</div>
                <button class="like-btn" data-id="${item.title}">
                  ♥ <span class="like-count">0</span>
                </button>
              </div>
              <div class="testi-name">${item.title}</div>
              <div class="testi-desc">${item.desc}</div>
            </div>
          </div>
        `;
      });
      
      // button like
      document.querySelectorAll('.like-btn').forEach(btn => {

        const id = btn.dataset.id;
        const countEl = btn.querySelector('.like-count');

        let likes = Number(localStorage.getItem('likes_' + id)) || 0;
        let liked = localStorage.getItem('liked_' + id) === 'true';

        function updateLikeUI() {
          countEl.textContent = likes;
          btn.classList.toggle('liked', liked);
        }

        updateLikeUI();
        btn.onclick = () => {
          liked = !liked;
          if (liked) {
            likes++;
          } else {
            likes = Math.max(0, likes - 1);
          }
          localStorage.setItem('likes_' + id, likes);
          localStorage.setItem('liked_' + id, liked);
          updateLikeUI();
        };
      });
    });
    
    // 々  Tampilkan Testimoni
    document.getElementById('openTesti').onclick = () => {
      document.getElementById('testiOverlay').classList.add('show');
      document.body.style.overflow = 'hidden';
    };
    
    // 々  Sembunyikan
    document.getElementById('closeTesti').onclick = () => {
      document.getElementById('testiOverlay').classList.remove('show');
      document.body.style.overflow = '';
    };

/**
 * Aveed Gorji — Portfolio Script
 * Interactive Media Explorer, Lightbox & Collapsible Header
 */

(function () {
  'use strict';

  // State
  let projects = window.PORTFOLIO_DATA || [];
  let currentLightboxImages = [];
  let currentLightboxIndex = 0;

  // DOM Elements
  const masthead = document.getElementById('masthead');
  const heroSection = document.getElementById('hero');
  const projectListEl = document.getElementById('project-list');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');

  // Lightbox Elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxProjTitle = document.getElementById('lightbox-proj-title');
  const lightboxAssetTitle = document.getElementById('lightbox-asset-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
  const lightboxExternalBtn = document.getElementById('lightbox-external-btn');

  // Utilities
  const enc = (path) => path.split('/').map(encodeURIComponent).join('/');
  const getFileUrl = (folder, file) => `${enc(folder)}/${enc(file)}`;
  const isImageExt = (ext) => ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext.toLowerCase());
  const isPdfExt = (ext) => ext.toLowerCase() === 'pdf';

  // Collapsible Header: Hidden at top, reveals when hero scrolls out of view
  if (masthead) {
    const handleScroll = () => {
      // Trigger threshold: when scrolled past 160px down
      if (window.scrollY > 160) {
        masthead.classList.add('visible');
      } else {
        masthead.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Render Projects List
  function renderProjects() {
    if (!projects || projects.length === 0) {
      projectListEl.innerHTML = `
        <div style="padding: 40px; text-align: center; border: 1px dashed var(--line); font-family: var(--font-mono);">
          No projects found.
        </div>`;
      return;
    }

    projectListEl.innerHTML = projects.map((project, pIndex) => {
      const media = project.media || [];
      const mediaCount = media.length;

      // Group categories for drawer tabs
      const categoryCounts = {};
      media.forEach((m) => {
        const cat = m.category || 'Other';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });

      // Find primary PDF and primary CAD/ZIP for quick direct links
      const firstPdf = media.find((m) => isPdfExt(m.type || ''));
      const firstArchive = media.find((m) => ['zip', 'step', 'f3d'].includes((m.type || '').toLowerCase()));

      let descHtml = '';
      if (Array.isArray(project.description)) {
        descHtml = `<ul class="project-bullets">${project.description.map((b) => `<li>${b}</li>`).join('')}</ul>`;
      } else if (project.description) {
        descHtml = `<p class="project-summary">${project.description}</p>`;
      } else if (project.summary) {
        descHtml = `<p class="project-summary">${project.summary}</p>`;
      }

      return `
        <article class="project-card" id="proj-card-${pIndex}" data-index="${pIndex}">
          <div class="project-main">
            <div class="project-content">
              <div class="project-topline">
                <div class="project-header-left">
                  <h2 class="project-title">${project.title}</h2>
                  ${project.organization ? `<div class="project-org">${project.organization}</div>` : ''}
                </div>
                ${project.date ? `<span class="project-date">${project.date}</span>` : ''}
              </div>
              ${descHtml}
            </div>
            <div class="project-actions">
              <button class="btn-inspect" data-toggle-drawer="${pIndex}" type="button" aria-expanded="false">
                <span>Explore ${mediaCount} Files</span>
                <span class="btn-arrow" style="font-size:10px;">▾</span>
              </button>
              <div class="quick-links">
                ${firstPdf ? `<a class="quick-link" href="${getFileUrl(project.folder, firstPdf.file)}" target="_blank" rel="noopener">Featured PDF ↗</a>` : ''}
                ${firstArchive ? `<a class="quick-link" href="${getFileUrl(project.folder, firstArchive.file)}" download>Download ${firstArchive.type.toUpperCase()} ↓</a>` : ''}
              </div>
            </div>
          </div>

          <!-- Collapsible Interactive Drawer -->
          <div class="project-drawer" id="drawer-${pIndex}">
            <div class="drawer-filter-bar">
              <div class="filter-tabs" data-filter-group="${pIndex}">
                <button class="filter-tab active" data-filter="all" type="button">All (${mediaCount})</button>
                ${Object.entries(categoryCounts).map(([cat, count]) => `
                  <button class="filter-tab" data-filter="${cat}" type="button">${cat} (${count})</button>
                `).join('')}
              </div>
              <div class="filter-meta">Click any media card to preview or inspect details</div>
            </div>

            <!-- Media Grid -->
            <div class="media-grid" id="grid-${pIndex}">
              ${renderMediaCards(project, media, pIndex, 'all')}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Individual Media Cards inside Drawer
  function renderMediaCards(project, mediaList, pIndex, activeCategory) {
    const filtered = activeCategory === 'all'
      ? mediaList
      : mediaList.filter((m) => m.category === activeCategory);

    if (filtered.length === 0) {
      return `<div style="grid-column: 1/-1; padding: 24px; text-align: center; color: var(--ink-muted); font-family: var(--font-mono); font-size: 13px;">No files found in this category.</div>`;
    }

    return filtered.map((item) => {
      const ext = (item.type || item.file.split('.').pop() || '').toLowerCase();
      const isImg = isImageExt(ext);
      const isPdf = isPdfExt(ext);
      const isCadOrZip = ['step', 'stp', 'f3d', 'stl', 'zip'].includes(ext);
      const url = getFileUrl(project.folder, item.file);

      // Thumbnail content
      let thumbMarkup = '';
      if (isImg) {
        thumbMarkup = `<img class="media-thumb" src="${url}" alt="${item.title}" loading="lazy" data-open-lightbox="${pIndex}" data-file="${item.file}">`;
      } else if (isPdf) {
        thumbMarkup = `
          <div class="media-icon-fallback" style="cursor:pointer;" onclick="window.open('${url}','_blank')">
            <span class="media-icon-symbol">📄</span>
            <span>Document / Report</span>
          </div>`;
      } else if (isCadOrZip) {
        thumbMarkup = `
          <div class="media-icon-fallback">
            <span class="media-icon-symbol">${ext === 'zip' ? '📦' : '📐'}</span>
            <span>${ext.toUpperCase()} Source Model</span>
          </div>`;
      } else {
        thumbMarkup = `
          <div class="media-icon-fallback">
            <span class="media-icon-symbol">📁</span>
            <span>${ext.toUpperCase()} File</span>
          </div>`;
      }

      // Actions
      let actionButtons = '';
      if (isImg) {
        actionButtons = `
          <button class="media-btn primary" data-open-lightbox="${pIndex}" data-file="${item.file}" type="button">
            Preview Photo 👁
          </button>
          <a class="media-btn" href="${url}" download>Download ↓</a>
        `;
      } else if (isPdf) {
        actionButtons = `
          <a class="media-btn primary" href="${url}" target="_blank" rel="noopener">
            Open PDF ↗
          </a>
          <a class="media-btn" href="${url}" download>Download ↓</a>
        `;
      } else {
        actionButtons = `
          <a class="media-btn primary" href="${url}" download>
            Download ${ext.toUpperCase()} ↓
          </a>
          <a class="media-btn" href="${url}" target="_blank" rel="noopener">Open ↗</a>
        `;
      }

      return `
        <div class="media-card" data-category="${item.category || ''}">
          <div class="media-thumb-wrap">
            ${thumbMarkup}
            <span class="media-type-badge">${ext}</span>
            ${item.size ? `<span class="media-size-badge">${item.size}</span>` : ''}
          </div>
          <div class="media-info">
            <span class="media-category-label">${item.category || 'General'}</span>
            <h3 class="media-title">${item.title}</h3>
            <p class="media-context">${item.context || ''}</p>
            <div class="media-filename-bar" title="${item.file}">
              ${item.file}
            </div>
            <div class="media-actions">
              ${actionButtons}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Drawer Toggle & Filter Event Delegation
  projectListEl.addEventListener('click', (e) => {
    // 1. Toggle Drawer
    const toggleBtn = e.target.closest('[data-toggle-drawer]');
    if (toggleBtn) {
      const pIndex = Number(toggleBtn.dataset.toggleDrawer);
      const card = document.getElementById(`proj-card-${pIndex}`);
      const isExpanded = card.classList.contains('expanded');

      if (isExpanded) {
        card.classList.remove('expanded');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelector('.btn-arrow').textContent = '▾';
      } else {
        card.classList.add('expanded');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.querySelector('.btn-arrow').textContent = '▴';
      }
      return;
    }

    // 2. Filter Category Tabs inside Drawer
    const filterBtn = e.target.closest('.filter-tab');
    if (filterBtn) {
      const filterGroup = filterBtn.closest('[data-filter-group]');
      if (filterGroup) {
        const pIndex = Number(filterGroup.dataset.filterGroup);
        const selectedCat = filterBtn.dataset.filter;

        filterGroup.querySelectorAll('.filter-tab').forEach((b) => b.classList.remove('active'));
        filterBtn.classList.add('active');

        const grid = document.getElementById(`grid-${pIndex}`);
        const project = projects[pIndex];
        if (grid && project) {
          grid.innerHTML = renderMediaCards(project, project.media || [], pIndex, selectedCat);
        }
      }
      return;
    }

    // 3. Open Lightbox
    const lightboxTrigger = e.target.closest('[data-open-lightbox]');
    if (lightboxTrigger) {
      const pIndex = Number(lightboxTrigger.dataset.openLightbox);
      const filePath = lightboxTrigger.dataset.file;
      openLightbox(pIndex, filePath);
      return;
    }
  });

  // Lightbox Implementation
  function openLightbox(projectIndex, initialFilePath) {
    const project = projects[projectIndex];
    if (!project || !project.media) return;

    currentLightboxImages = project.media
      .filter((m) => isImageExt(m.type || m.file.split('.').pop() || ''))
      .map((m) => ({
        ...m,
        projectTitle: project.title,
        folder: project.folder
      }));

    if (currentLightboxImages.length === 0) return;

    let startIndex = currentLightboxImages.findIndex((m) => m.file === initialFilePath);
    if (startIndex === -1) startIndex = 0;
    currentLightboxIndex = startIndex;

    updateLightboxView();
    lightbox.showModal();
  }

  function updateLightboxView() {
    const item = currentLightboxImages[currentLightboxIndex];
    if (!item) return;

    const url = getFileUrl(item.folder, item.file);
    lightboxImg.src = url;
    lightboxImg.alt = item.title;
    lightboxProjTitle.textContent = item.projectTitle;
    lightboxAssetTitle.textContent = item.title;
    lightboxCaption.textContent = item.context || '';
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;

    lightboxDownloadBtn.href = url;
    lightboxDownloadBtn.download = item.file.split('/').pop();
    lightboxExternalBtn.href = url;

    if (currentLightboxImages.length <= 1) {
      lightboxPrev.style.display = 'none';
      lightboxNext.style.display = 'none';
    } else {
      lightboxPrev.style.display = 'flex';
      lightboxNext.style.display = 'flex';
    }
  }

  function nextLightbox() {
    if (currentLightboxImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightboxView();
  }

  function prevLightbox() {
    if (currentLightboxImages.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightboxView();
  }

  lightboxClose.addEventListener('click', () => lightbox.close());
  lightboxNext.addEventListener('click', nextLightbox);
  lightboxPrev.addEventListener('click', prevLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'Escape') lightbox.close();
  });

  // Copy Email Button
  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.dataset.email || 'agorji@scu.edu';
      navigator.clipboard.writeText(email).then(() => {
        const orig = copyEmailText.textContent;
        copyEmailText.textContent = 'Copied to Clipboard! ✓';
        setTimeout(() => { copyEmailText.textContent = orig; }, 2000);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  // Initialize
  renderProjects();
})();

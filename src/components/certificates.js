import { icon } from '../icons.js'

export function certificateCard(cert, index) {
  return `<article class="cert-card reveal" data-certificate-index="${index}">
    <div class="cert-top">
      ${icon('award', 'size-5')}
      <div class="cert-actions">
        <button type="button" class="icon-button" data-preview-cert="${cert.id}" aria-label="Ver certificado ${cert.title}" title="Ver certificado">${icon('eye', 'size-4')}</button>
        <button type="button" class="icon-button ${cert.verifyUrl ? '' : 'is-pending'}" data-verify-cert="${cert.id}" aria-label="Abrir validación de ${cert.title}" title="Abrir validación">${icon('external', 'size-4')}</button>
      </div>
    </div>
    <h3>${cert.title}</h3>
    <p>${cert.issuer}</p>
    <small>${cert.year}</small>
  </article>`
}

export function certificateDialog() {
  return `<dialog class="certificate-dialog" aria-labelledby="certificate-dialog-title">
    <div class="dialog-panel">
      <button type="button" class="dialog-close" aria-label="Cerrar certificado">${icon('close', 'size-5')}</button>
      <div class="dialog-heading"><span>VERIFICACIÓN // CERTIFICATE_VIEWER</span><h2 id="certificate-dialog-title"></h2><p class="dialog-issuer"></p></div>
      <div class="certificate-viewer"></div>
      <a class="dialog-verify" target="_blank" rel="noreferrer">${icon('external', 'size-4')} Ver credencial oficial</a>
    </div>
  </dialog>`
}

export function setupCertificates(certificates, showToast, getUi) {
  const dialog = document.querySelector('.certificate-dialog')
  const title = dialog.querySelector('#certificate-dialog-title')
  const issuer = dialog.querySelector('.dialog-issuer')
  const viewer = dialog.querySelector('.certificate-viewer')
  const verifyLink = dialog.querySelector('.dialog-verify')
  const findCertificate = id => certificates.find(cert => cert.id === id)

  document.querySelectorAll('[data-preview-cert]').forEach(button => button.addEventListener('click', () => {
    const cert = findCertificate(button.dataset.previewCert)
    const ui = getUi()
    title.textContent = cert.title
    issuer.textContent = `${cert.issuer} · ${cert.year}`
    if (cert.previewUrl) {
      const extension = cert.previewUrl.split('.').pop().toLowerCase()
      viewer.innerHTML = extension === 'pdf'
        ? `<iframe src="${cert.previewUrl}#toolbar=0" title="Certificado ${cert.title}"></iframe>`
        : `<img src="${cert.previewUrl}" alt="Certificado ${cert.title}">`
    } else {
      viewer.innerHTML = `<div class="certificate-empty">${icon('award', 'size-9')}<strong>${ui.previewPending}</strong><p>${ui.previewHelp}</p></div>`
    }
    verifyLink.hidden = !cert.verifyUrl
    if (cert.verifyUrl) verifyLink.href = cert.verifyUrl
    dialog.showModal()
    document.body.classList.add('modal-open')
  }))

  document.querySelectorAll('[data-verify-cert]').forEach(button => button.addEventListener('click', () => {
    const cert = findCertificate(button.dataset.verifyCert)
    if (cert.verifyUrl) window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer')
    else showToast(`${getUi().missingCredential}: ${cert.title}`)
  }))

  const closeDialog = () => {
    dialog.close()
    document.body.classList.remove('modal-open')
  }
  dialog.querySelector('.dialog-close').addEventListener('click', closeDialog)
  dialog.addEventListener('click', event => event.target === dialog && closeDialog())
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'))
}

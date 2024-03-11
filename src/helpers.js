const displaySection = (id) => {
    document.querySelector('section.active')?.classList.remove('active')
    document.querySelector(`#${id}-section`)?.classList.add('active')
}

const activateLink = (id) => {
    document.querySelector(`nav a.active`)?.classList.remove('active')
    document.querySelector(`nav a[href="${id}"]`)?.classList.add('active')
}

export { displaySection, activateLink }

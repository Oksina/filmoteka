const tooltipContainer = document.querySelector('.film-tooltip-container');

tooltipContainer.addEventListener('mouseover', () => {
  const tooltip = tooltipContainer.querySelector('.film-tooltip');
  tooltip.classList.add('active');
});

tooltipContainer.addEventListener('mouseleave', () => {
  const tooltip = tooltipContainer.querySelector('.film-tooltip');
  tooltip.classList.remove('active');
});

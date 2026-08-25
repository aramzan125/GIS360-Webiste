(() => {
    'use strict';

    const network = document.querySelector('[data-gis360-service-network]');

    if (!network || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    network.classList.add('is-animated');

    const nodes = Array.from(network.querySelectorAll('.gis360-network-svg--desktop .gis360-network-node'));
    let activeNode = 0;

    const highlightNextNode = () => {
        nodes.forEach((node, index) => node.classList.toggle('is-active', index === activeNode));
        activeNode = (activeNode + 1) % nodes.length;
    };

    highlightNextNode();
    window.setInterval(highlightNextNode, 2200);
})();

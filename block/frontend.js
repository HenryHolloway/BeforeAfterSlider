document.addEventListener('DOMContentLoaded', function() {
    const sliderContainers = document.querySelectorAll('.slider-container');

    sliderContainers.forEach(function(sliderContainer) {
        const beforeImage = sliderContainer.querySelector('.before-image');
        const afterImage = sliderContainer.querySelector('.after-image');
        const sliderBar = sliderContainer.querySelector('.slider-bar');
        const dragMeBox = sliderContainer.querySelector('.drag-me-box');
        const beforeText = sliderContainer.querySelector('.before-text');
        const afterText = sliderContainer.querySelector('.after-text');

        function updateContainerSize() {
            const beforeAspectRatio = beforeImage.naturalWidth / beforeImage.naturalHeight;
            const afterAspectRatio = afterImage.naturalWidth / afterImage.naturalHeight;

            let minWidth, minHeight;

            if (beforeAspectRatio > afterAspectRatio) {
                minWidth = afterImage.naturalWidth;
                minHeight = minWidth / beforeAspectRatio;
            } else {
                minHeight = afterImage.naturalHeight;
                minWidth = minHeight * beforeAspectRatio;
            }

            const maxWidth = window.innerWidth * 0.6;
            const maxHeight = window.innerHeight * 0.6;

            if (minWidth > maxWidth) {
                minHeight = (maxWidth / minWidth) * minHeight;
                minWidth = maxWidth;
            }

            if (minHeight > maxHeight) {
                minWidth = (maxHeight / minHeight) * minWidth;
                minHeight = maxHeight;
            }

            sliderContainer.style.width = `${minWidth}px`;
            sliderContainer.style.height = `${minHeight}px`;
        }

        function checkImagesLoaded() {
            if (beforeImage.complete && afterImage.complete) {
                updateContainerSize();
            } else {
                beforeImage.addEventListener('load', updateContainerSize);
                afterImage.addEventListener('load', updateContainerSize);
            }
        }

        function updateDragMeBoxPosition() {
            const sliderRect = sliderBar.getBoundingClientRect();
            const containerRect = sliderContainer.getBoundingClientRect();
            const leftPosition = (sliderRect.width * (sliderBar.value / 100)) - (dragMeBox.offsetWidth / 2) + 26;
            dragMeBox.style.left = `${leftPosition}px`;
        }

        function updateTextOpacity() {
            const sliderValue = sliderBar.value;
            beforeText.style.opacity = sliderValue / 100;
            afterText.style.opacity = (100 - sliderValue) / 100;
        }

        checkImagesLoaded();
        window.addEventListener('resize', updateContainerSize);
        window.addEventListener('resize', updateDragMeBoxPosition);

        sliderBar.addEventListener('input', function () {
            const sliderValue = this.value;
            beforeImage.style.clipPath = `inset(0 ${100 - sliderValue}% 0 0)`;
            updateDragMeBoxPosition();
            updateTextOpacity();
        });

        updateDragMeBoxPosition();
        updateTextOpacity();
    });
});

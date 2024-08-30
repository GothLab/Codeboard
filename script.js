// Initialize CodeMirror
        const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
            lineNumbers: true,
            mode: 'javascript',
            theme: 'dracula',
            tabSize: 2,
            indentUnit: 2,
            matchBrackets: true
        });

        // Variables for dragging and zooming
        const canvasContainer = document.getElementById('canvas-container');
        const canvas = document.getElementById('canvas');
        let isDragging = false;
        let startX, startY, initialX, initialY;
        let scale = 1;

        // Dragging functionality
        canvasContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - initialX;
            startY = e.clientY - initialY;
            canvasContainer.style.cursor = 'grabbing';
        });

        canvasContainer.addEventListener('mouseup', () => {
            isDragging = false;
            initialX = parseInt(canvas.style.left || 0);
            initialY = parseInt(canvas.style.top || 0);
            canvasContainer.style.cursor = 'grab';
        });

        canvasContainer.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const x = e.clientX - startX;
                const y = e.clientY - startY;
                canvas.style.left = `${x}px`;
                canvas.style.top = `${y}px`;
            }
        });

        // Zooming functionality
        canvasContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.1;
            scale += e.deltaY * -zoomSpeed;
            scale = Math.min(Math.max(0.5, scale), 3); // Restrict scale between 0.5x and 3x
            canvas.style.transform = `scale(${scale})`;
        });

        // Initialize positions
        initialX = 0;
        initialY = 0;
        canvas.style.left = `${initialX}px`;
        canvas.style.top = `${initialY}px`;
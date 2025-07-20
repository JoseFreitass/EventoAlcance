// Script simplificado para o vídeo
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const playButton = document.getElementById('simplePlayButton');
    const darkOverlay = document.getElementById('videoDarkOverlay');
    const volumeControl = document.getElementById('volumeControl');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    
    if (video && playButton && darkOverlay && volumeControl && volumeSlider && volumeIcon) {
        // Quando clicar no botão de play
        playButton.addEventListener('click', function() {
            video.play();
            playButton.classList.add('hidden');
            darkOverlay.classList.add('hidden');
            volumeControl.classList.add('visible');
        });
        
        // Quando o vídeo terminar, mostrar o botão e overlay novamente
        video.addEventListener('ended', function() {
            playButton.classList.remove('hidden');
            darkOverlay.classList.remove('hidden');
            volumeControl.classList.remove('visible');
        });
        
        // Quando o vídeo for pausado, mostrar o botão e overlay novamente
        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
            darkOverlay.classList.remove('hidden');
            volumeControl.classList.remove('visible');
        });
        
        // Quando o vídeo estiver tocando, esconder o botão e overlay
        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
            darkOverlay.classList.add('hidden');
            volumeControl.classList.add('visible');
        });
        
        // Controle de volume
        volumeSlider.addEventListener('input', function() {
            const volume = this.value / 100;
            video.volume = volume;
            updateVolumeIcon(volume);
        });
        
        // Clique no ícone para mutar/desmutar
        volumeIcon.addEventListener('click', function() {
            if (video.muted || video.volume === 0) {
                video.muted = false;
                video.volume = volumeSlider.value / 100;
                volumeSlider.value = video.volume * 100;
                updateVolumeIcon(video.volume);
            } else {
                video.muted = true;
                updateVolumeIcon(0);
            }
        });
        
        // Função para atualizar o ícone do volume
        function updateVolumeIcon(volume) {
            if (video.muted || volume === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (volume < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        }
        
        // Inicializar volume
        updateVolumeIcon(1);
    }
}); 

 
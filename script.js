// Script simplificado para o vídeo
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const playButton = document.getElementById('simplePlayButton');
    const darkOverlay = document.getElementById('videoDarkOverlay');
    
    if (video && playButton && darkOverlay) {
        // Quando clicar no botão de play
        playButton.addEventListener('click', function() {
            video.play();
            playButton.classList.add('hidden');
            darkOverlay.classList.add('hidden');
        });
        
        // Quando o vídeo terminar, mostrar o botão e overlay novamente
        video.addEventListener('ended', function() {
            playButton.classList.remove('hidden');
            darkOverlay.classList.remove('hidden');
        });
        
        // Quando o vídeo for pausado, mostrar o botão e overlay novamente
        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
            darkOverlay.classList.remove('hidden');
        });
        
        // Quando o vídeo estiver tocando, esconder o botão e overlay
        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
            darkOverlay.classList.add('hidden');
        });
    }
}); 

 
// Script simplificado para o vídeo
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('heroVideo');
    const playButton = document.getElementById('simplePlayButton');
    
    if (video && playButton) {
        // Quando clicar no botão de play
        playButton.addEventListener('click', function() {
            video.play();
            playButton.classList.add('hidden');
        });
        
        // Quando o vídeo terminar, mostrar o botão novamente
        video.addEventListener('ended', function() {
            playButton.classList.remove('hidden');
        });
        
        // Quando o vídeo for pausado, mostrar o botão novamente
        video.addEventListener('pause', function() {
            playButton.classList.remove('hidden');
        });
        
        // Quando o vídeo estiver tocando, esconder o botão
        video.addEventListener('play', function() {
            playButton.classList.add('hidden');
        });
    }
}); 

 
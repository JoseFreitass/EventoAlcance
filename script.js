// Script simplificado para o vídeo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de vídeo carregado');
    
    const video = document.getElementById('heroVideo');
    const playButton = document.getElementById('simplePlayButton');
    const pauseButton = document.getElementById('pauseButton');
    const darkOverlay = document.getElementById('videoDarkOverlay');
    const volumeControl = document.getElementById('volumeControl');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.getElementById('volumeIcon');
    
    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('É mobile:', isMobile);
    
    console.log('Elementos encontrados:', {
        video: !!video,
        playButton: !!playButton,
        pauseButton: !!pauseButton,
        darkOverlay: !!darkOverlay,
        volumeControl: !!volumeControl,
        volumeSlider: !!volumeSlider,
        volumeIcon: !!volumeIcon
    });
    
    if (video && playButton && pauseButton && darkOverlay && volumeControl && volumeSlider && volumeIcon) {
        console.log('Todos os elementos encontrados, configurando eventos');
        
        // Configurar vídeo para mobile
        if (isMobile) {
            video.muted = true; // Mobile precisa estar mutado para autoplay
            video.volume = 0.5; // Volume padrão para mobile
        }
        
        // Quando clicar no botão de play
        playButton.addEventListener('click', function() {
            console.log('Botão play clicado');
            
            // Para mobile, desmutar o vídeo quando o usuário clicar
            if (isMobile) {
                video.muted = false;
            }
            
            video.play().then(() => {
                console.log('Vídeo iniciado com sucesso');
                playButton.classList.add('hidden');
                darkOverlay.classList.add('hidden');
                volumeControl.classList.add('visible');
            }).catch(error => {
                console.error('Erro ao iniciar vídeo:', error);
                // Fallback para mobile: tentar com muted
                if (isMobile) {
                    video.muted = true;
                    video.play().then(() => {
                        console.log('Vídeo iniciado com muted (mobile)');
                        playButton.classList.add('hidden');
                        darkOverlay.classList.add('hidden');
                        volumeControl.classList.add('visible');
                    }).catch(err => {
                        console.error('Erro mesmo com muted:', err);
                    });
                }
            });
        });
        
        // Quando clicar no botão de pause
        pauseButton.addEventListener('click', function() {
            console.log('Botão pause clicado');
            video.pause();
        });
        
        // Quando o vídeo terminar, mostrar o botão e overlay novamente
        video.addEventListener('ended', function() {
            console.log('Vídeo terminou');
            playButton.classList.remove('hidden');
            pauseButton.classList.remove('visible');
            darkOverlay.classList.remove('hidden');
            volumeControl.classList.remove('visible');
        });
        
        // Quando o vídeo for pausado, mostrar o botão e overlay novamente
        video.addEventListener('pause', function() {
            console.log('Vídeo pausado');
            playButton.classList.remove('hidden');
            pauseButton.classList.remove('visible');
            darkOverlay.classList.remove('hidden');
            volumeControl.classList.remove('visible');
        });
        
        // Quando o vídeo estiver tocando, esconder o botão e overlay
        video.addEventListener('play', function() {
            console.log('Vídeo tocando');
            playButton.classList.add('hidden');
            pauseButton.classList.add('visible');
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
        console.log('Configuração do vídeo concluída');
    } else {
        console.error('Alguns elementos não foram encontrados');
    }
}); 

 
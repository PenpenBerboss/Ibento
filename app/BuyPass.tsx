import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function BuyPass() {
  const ticket = {
    userName: 'John Doe',
    eventName: "Avant-première IBENTO",
    purchaseDate: '31/10/2025',
    purchaseTime: '21:45',
    location: 'Douala Grand Mall',
    ticketNumber: 'IBN-8745632',
    // image de l'événement (URL). Remplacez par votre asset public si nécessaire.
    eventImage: 'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=800&q=80',
  };

  // Générer un code-barres unique basé sur les informations du ticket
  const generateBarcode = () => {
    const data = `${ticket.ticketNumber}-${ticket.userName}-${ticket.purchaseDate}`;
    const hash = data.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash).toString().padStart(12, '0');
  };

  const barcodeNumber = generateBarcode();

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { 
        margin: 0; 
        font-family: 'Arial', sans-serif; 
        background: #f5f5f5; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        min-height: 100vh; 
        padding: 20px;
      }
      
      .ticket-container {
        background: #D4AF37;
        width: 500px;
        height: 200px;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        display: flex;
      }

      /* Perforations en haut */
      .ticket-container::before {
        content: '';
        position: absolute;
        top: -5px;
        left: 0;
        right: 0;
        height: 10px;
        background: repeating-linear-gradient(
          to right,
          transparent 0px,
          transparent 8px,
          white 8px,
          white 12px
        );
        z-index: 2;
      }

      /* Perforations en bas */
      .ticket-container::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 10px;
        background: repeating-linear-gradient(
          to right,
          transparent 0px,
          transparent 8px,
          white 8px,
          white 12px
        );
        z-index: 2;
      }

      /* Section code-barres à gauche */
      .barcode-section {
        width: 80px;
        background: #B8860B;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        border-right: 2px dashed #8B7355;
      }

      .barcode {
        writing-mode: vertical-lr;
        text-orientation: mixed;
        font-size: 10px;
        color: #333;
        letter-spacing: 1px;
        margin-bottom: 10px;
        font-weight: bold;
      }

      .barcode-lines {
        display: flex;
        flex-direction: column;
        gap: 1px;
        height: 120px;
        width: 50px;
      }

      .bar {
        background: #333;
        height: 2px;
        width: 100%;
      }

      .bar:nth-child(odd) {
        width: 80%;
      }

      .bar:nth-child(3n) {
        width: 60%;
      }

      .bar:nth-child(5n) {
        width: 90%;
      }

      /* Section principale du ticket */
      .main-section {
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      }

      /* Trous de perforation sur les côtés */
      .perforation-left {
        position: absolute;
        left: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
      }

      .perforation-right {
        position: absolute;
        right: -10px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
      }

      /* En-tête avec étoiles et titre */
      .header {
        text-align: center;
        margin-bottom: 15px;
      }

      .stars {
        color: #8B4513;
        font-size: 14px;
        margin-bottom: 5px;
      }

      .title {
        font-size: 18px;
        font-weight: bold;
        color: #8B4513;
        letter-spacing: 1px;
        border: 2px solid #8B4513;
        padding: 5px 15px;
        display: inline-block;
        border-radius: 5px;
      }

      /* Informations du ticket */
      .ticket-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
      }

      .info-left {
        flex: 1;
      }

      .info-item {
        margin-bottom: 8px;
        font-size: 12px;
        color: #8B4513;
      }

      .info-label {
        font-weight: bold;
        display: inline-block;
        width: 60px;
      }

      .info-value {
        color: #333;
      }

      /* Section image événement */
      .event-image-section {
        width: 120px;
        height: 80px;
        background: #8B4513;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .event-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .play-icon {
        position: absolute;
        right: 8px;
        bottom: 8px;
        color: #D4AF37;
        font-size: 20px;
      }

      .event-label {
        position: absolute;
        top: 5px;
        right: 5px;
        background: rgba(0,0,0,0.7);
        color: #D4AF37;
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: bold;
      }

      /* Numéro de ticket en bas */
      .ticket-number {
        text-align: center;
        font-size: 10px;
        color: #8B4513;
        font-weight: bold;
        margin-top: 10px;
      }

      .download-btn {
        margin-top: 20px;
        background: #D4AF37;
        color: #8B4513;
        border: 2px solid #8B4513;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .download-btn:hover {
        background: #B8860B;
        color: white;
      }
    </style>
  </head>
  <body>
    <div>
      <div class="ticket-container">
        <div class="perforation-left"></div>
        <div class="perforation-right"></div>
        
        <!-- Section code-barres -->
        <div class="barcode-section">
          <div class="barcode">${barcodeNumber}</div>
          <div class="barcode-lines">
            ${Array.from({length: 40}, (_, i) => `<div class="bar"></div>`).join('')}
          </div>
        </div>

        <!-- Section principale -->
        <div class="main-section">
          <div class="header">
            <div class="stars">★ ★ ★</div>
            <div class="title">TICKET ÉVÉNEMENT</div>
          </div>

          <div class="ticket-info">
            <div class="info-left">
              <div class="info-item">
                <span class="info-label">NOM:</span>
                <span class="info-value">${ticket.userName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">HEURE:</span>
                <span class="info-value">${ticket.purchaseTime}</span>
              </div>
              <div class="info-item">
                <span class="info-label">DATE:</span>
                <span class="info-value">${ticket.purchaseDate}</span>
              </div>
              <div class="info-item">
                <span class="info-label">LIEU:</span>
                <span class="info-value">${ticket.location}</span>
              </div>
            </div>

            <div class="event-image-section">
              <img src="${ticket.eventImage}" alt="Événement" class="event-image" />
              <div class="event-label">ÉVÉNEMENT</div>
              <div class="play-icon">▶</div>
            </div>
          </div>

          <div class="ticket-number">${ticket.ticketNumber}</div>
        </div>
      </div>

      <button class="download-btn" onclick="downloadTicket()">
        Télécharger le ticket
      </button>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script>
      async function downloadTicket() {
        const ticketElement = document.querySelector('.ticket-container');
        try {
          const canvas = await html2canvas(ticketElement, { 
            scale: 3, 
            backgroundColor: null,
            useCORS: true 
          });
          const imgData = canvas.toDataURL('image/png');
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF('landscape', 'mm', [150, 60]);
          pdf.addImage(imgData, 'PNG', 5, 5, 140, 50);
          pdf.save('${ticket.eventName}_ticket.pdf');
        } catch (error) {
          console.error('Erreur lors du téléchargement:', error);
          // Fallback: télécharger comme image
          const link = document.createElement('a');
          link.download = '${ticket.eventName}_ticket.png';
          link.href = canvas.toDataURL();
          link.click();
        }
      }
    </script>
  </body>
  </html>
  `;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
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

    const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { margin:0; font-family: Arial, Helvetica, sans-serif; background: #f3f4f6; display:flex; align-items:center; justify-content:center; height:100vh; }
      .ticket { width:450px; height:180px; background:#DAA520; color:#000; border:5px solid #B8860B; border-radius:12px; display:flex; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.2); }
      .left { flex:1; padding:14px; display:flex; flex-direction:column; justify-content:space-between; }
      .right { width:140px; position:relative; }
      .right img { width:100%; height:100%; object-fit:cover; opacity:0.95 }
      .badge { position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.6); color:#FFD966; text-align:center; padding:6px; font-weight:700; }
      .qr-row { display:flex; align-items:center; justify-content:space-between }
      .meta p { margin:2px 0 }
      .title { display:flex; justify-content:space-between; align-items:center }
      .title h2 { margin:0; font-size:18px }
      .ticket-number { font-family: monospace; font-size:12px; color:#F8E7B0 }
      .download { margin-top:12px; display:flex; justify-content:center }
      button { background:#B8860B; color:#fff; border:none; padding:10px 14px; border-radius:8px; font-weight:700 }
    </style>
  </head>
  <body>
    <div id="wrap">
      <div id="ticket" class="ticket">
        <div class="left">
          <div>
            <div class="title">
              <h2>🎟 IBENTO PASS</h2>
              <div class="ticket-number">#${ticket.ticketNumber}</div>
            </div>
            <div class="meta" style="margin-top:8px;">
              <p><strong>Nom:</strong> ${ticket.userName}</p>
              <p><strong>Date d'achat:</strong> ${ticket.purchaseDate}</p>
              <p><strong>Heure:</strong> ${ticket.purchaseTime}</p>
              <p><strong>Lieu:</strong> ${ticket.location}</p>
            </div>
          </div>

          <div class="qr-row">
            <div id="qrcode"></div>
            <div style="font-style:italic; color:#F8E7B0; font-size:12px; margin-left:8px">${ticket.eventName}</div>
          </div>
        </div>
        <div class="right">
          <img src="${ticket.eventImage}" alt="event"/>
          <div class="badge">IBENTO EVENT</div>
        </div>
      </div>

      <div class="download">
        <button id="download">Télécharger le ticket</button>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script>
      (function(){
        const qrValue = '${ticket.ticketNumber}-${ticket.userName}-${ticket.purchaseDate}-${ticket.purchaseTime}-${ticket.eventName}';
        // générer QR avec couleur IBENTO
        QRCode.toCanvas(document.getElementById('qrcode'), qrValue, { width: 100, color: { dark: '#fbbf24', light: '#0000' } }, function(err){ if(err) console.error(err); });

        document.getElementById('download').addEventListener('click', async function(){
          const el = document.getElementById('ticket');
          const canvas = await html2canvas(el, { scale:2, backgroundColor: null });
          const imgData = canvas.toDataURL('image/png');
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF('landscape', 'mm', 'a6');
          pdf.addImage(imgData, 'PNG', 0, 0, 148, 105);
          pdf.save('${ticket.eventName}_ticket.pdf');
        });
      })();
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

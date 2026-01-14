import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QRCodeCanvas } from 'qrcode.react';

interface TicketPassProps {
  userName: string;
  eventName: string;
  purchaseDate: string;
  purchaseTime: string;
  location: string;
  ticketNumber: string;
  eventImage: string;
}

export default function TicketPass({
  userName,
  eventName,
  purchaseDate,
  purchaseTime,
  location,
  ticketNumber,
  eventImage,
}: TicketPassProps) {
  const ticketRef = useRef<HTMLDivElement | null>(null);

  const qrValue = `${ticketNumber}-${userName}-${purchaseDate}-${purchaseTime}-${eventName}`;

  const handleDownload = async () => {
    const ticketEl = ticketRef.current || document.getElementById('ticket');
    if (!ticketEl) return;

    try {
      const canvas = await html2canvas(ticketEl as HTMLElement, { scale: 2, backgroundColor: null });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a6');
      // ajuster la taille de l'image dans le PDF (A6 paysage environ 148 x 105 mm)
      pdf.addImage(imgData, 'PNG', 0, 0, 148, 105);
      pdf.save(`${eventName}_ticket.pdf`);
    } catch (err) {
      console.error('Erreur génération PDF:', err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        id="ticket"
        ref={ticketRef}
        className="relative w-[450px] h-[180px] bg-yellow-600 text-white rounded-lg shadow-lg flex overflow-hidden border-[5px] border-yellow-800"
      >
        {/* Left */}
        <div className="flex-1 flex flex-col justify-between px-6 py-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-wider">🎟 IBENTO PASS</h2>
            <p className="text-xs text-yellow-200 font-mono">#{ticketNumber}</p>
          </div>

          <div className="mt-1 text-sm space-y-1 text-black">
            <p><span className="font-semibold">Nom:</span> {userName}</p>
            <p><span className="font-semibold">Date d’achat:</span> {purchaseDate}</p>
            <p><span className="font-semibold">Heure:</span> {purchaseTime}</p>
            <p><span className="font-semibold">Lieu:</span> {location}</p>
          </div>

          <div className="flex justify-between items-center mt-3">
            <QRCodeCanvas
              value={qrValue}
              size={70}
              bgColor="#fbbf24"
              fgColor="#000000"
              level="H"
              includeMargin={false}
            />
            <p className="italic text-yellow-200 text-xs ml-2">{eventName}</p>
          </div>
        </div>

        {/* Right - image */}
        <div className="relative w-[140px] h-full bg-yellow-700 flex flex-col justify-center items-center overflow-hidden">
          <img src={eventImage} alt="Événement" className="object-cover w-full h-full opacity-90" />
          <div className="absolute bottom-0 w-full bg-black/60 text-center text-xs py-1">
            <p className="text-yellow-300 font-semibold">IBENTO EVENT</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Télécharger le ticket
      </button>
    </div>
  );
}

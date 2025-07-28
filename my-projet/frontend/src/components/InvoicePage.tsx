import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const InvoicePage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(err => console.error(err));
  }, [orderId]);

  const generateInvoicePDF = () => {
    if (!order) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('FACTURE', 14, 22);

    doc.setFontSize(12);
    doc.text(`N° de Commande : ${order._id || order.orderId}`, 14, 32);
    doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString()}`, 14, 40);
    doc.text(`Client : ${order.customer?.name || 'Client'}`, 14, 48);

    autoTable(doc, {
      startY: 58,
      head: [['Produit', 'Quantité', 'Prix unitaire', 'Total']],
      body: order.items.map((item: any) => [
        item.name,
        item.quantity,
        `${item.price} FCFA`,
        `${item.quantity * item.price} FCFA`,
      ]),
    });

    const total = order.items.reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);
    doc.text(`Total : ${total} FCFA`, 14, doc.lastAutoTable.finalY + 10);

    doc.save(`facture-${order._id || order.orderId}.pdf`);
  };

  if (!order) return <div>Chargement...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Facture n° {order.orderId || order._id}</h2>
      <p>Date : {new Date(order.createdAt).toLocaleString()}</p>

      <h3 className="mt-4 font-semibold">Produits :</h3>
      <ul className="mb-4">
        {order.items.map((item: any, i: number) => (
          <li key={i}>
            {item.name} - {item.quantity} x {item.price} FCFA
          </li>
        ))}
      </ul>

      <p className="font-bold mb-6">Total : {order.total || order.items.reduce((t: number, i: any) => t + i.quantity * i.price, 0)} FCFA</p>

      <button
        onClick={generateInvoicePDF}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Télécharger la facture PDF
      </button>
    </div>
  );
};

export default InvoicePage;

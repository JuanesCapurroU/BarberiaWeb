import React, { useEffect, useState, useRef } from 'react';
import { getBarberos } from '../services/barberos';
import { getTotalDiarioBarbero, getServiciosMasVendidos } from '../services/ventas';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function AnalisisVentas() {
  const [barberos, setBarberos] = useState([]);
  const [fecha, setFecha] = useState(() => new Date().toISOString().slice(0, 10));
  const [ventas, setVentas] = useState({});
  const [serviciosMasVendidos, setServiciosMasVendidos] = useState([]);
  const [totalVentasDia, setTotalVentasDia] = useState(0);

  // Referencia para el área que quieres exportar
  const pdfRef = useRef();

  useEffect(() => {
    cargarBarberos();
  }, []);

  useEffect(() => {
    if (barberos.length > 0) {
      cargarVentas();
    }
    // eslint-disable-next-line
  }, [fecha, barberos]);

  useEffect(() => {
    cargarServiciosMasVendidos();
  }, [fecha]);

  const cargarBarberos = async () => {
    const data = await getBarberos();
    setBarberos(data);
  };

  const cargarVentas = async () => {
    const resultados = {};
    let total = 0;
    for (const barbero of barberos) {
      const totalBarbero = await getTotalDiarioBarbero(barbero.idBarbero, fecha);
      resultados[barbero.idBarbero] = totalBarbero;
      total += Number(totalBarbero || 0);
    }
    setVentas(resultados);
    setTotalVentasDia(total);
  };

  const cargarServiciosMasVendidos = async () => {
    try {
      const data = await getServiciosMasVendidos(fecha);
      setServiciosMasVendidos(data);
    } catch {
      setServiciosMasVendidos([]);
    }
  };

  // Datos para gráfica de barras (ventas por barbero)
  const barData = {
    labels: barberos.map(b => b.nombre),
    datasets: [
      {
        label: 'Ventas ($)',
        data: barberos.map(b => ventas[b.idBarbero] || 0),
        backgroundColor: 'rgba(0,87,183,0.7)',
        borderColor: '#ffd700',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  // Datos para gráfica de pastel (servicios más vendidos)
  const pieData = {
    labels: serviciosMasVendidos.map(s => s.nombreServicio),
    datasets: [
      {
        data: serviciosMasVendidos.map(s => s.cantidad),
        backgroundColor: [
          '#0057b7', '#ffd700', '#ffb700', '#0077b7', '#00b7b7', '#b7b700'
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  // Barbero top
  const barberoTop = barberos.reduce((max, b) =>
    (ventas[b.idBarbero] || 0) > (ventas[max?.idBarbero] || 0) ? b : max, null);

  // Servicio top
  const servicioTop = serviciosMasVendidos.length > 0
    ? serviciosMasVendidos.reduce((max, s) => s.cantidad > max.cantidad ? s : max, serviciosMasVendidos[0])
    : null;

  // Función para descargar el PDF
  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`analisis-ventas-${fecha}.pdf`);
  };

  return (
    <div style={{ maxWidth: 900, margin: 'auto' }}>
      <button
        onClick={handleDownloadPDF}
        style={{
          margin: '12px 0 16px 0',
          background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 7,
          padding: '10px 24px',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          float: 'right'
        }}
      >
        Descargar PDF
      </button>
      <div
        ref={pdfRef}
        style={{
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
          padding: 32,
          marginTop: 16
        }}
      >
        <h2 style={{ color: '#0057b7', marginBottom: 24 }}>Análisis de Ventas</h2>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontWeight: 600, marginRight: 12 }}>Fecha: </label>
          <input
            type="date"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #b0b0b0',
              fontSize: 15
            }}
          />
        </div>

        {/* Resumen general */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          <div style={resumenBox}>
            <div style={resumenLabel}>Total ventas del día</div>
            <div style={resumenValor}>${totalVentasDia.toLocaleString('es-CO', { minimumFractionDigits: 0 })}</div>
          </div>
          <div style={resumenBox}>
            <div style={resumenLabel}>Barbero top</div>
            <div style={resumenValor}>{barberoTop ? barberoTop.nombre : '-'}</div>
          </div>
          <div style={resumenBox}>
            <div style={resumenLabel}>Servicio top</div>
            <div style={resumenValor}>{servicioTop ? servicioTop.nombreServicio : '-'}</div>
          </div>
        </div>

        {/* Gráfica de barras y pastel */}
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', margin: '24px 0' }}>
          <div style={{ background: '#fafbfc', borderRadius: 12, padding: 16 }}>
            <h4 style={{ textAlign: 'center', color: '#0057b7' }}>Ventas por barbero</h4>
            <div style={{ width: 350, height: 250 }}>
              <Bar data={barData} options={{
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }} />
            </div>
          </div>
          <div style={{ background: '#fafbfc', borderRadius: 12, padding: 16 }}>
            <h4 style={{ textAlign: 'center', color: '#0057b7' }}>Servicios más vendidos</h4>
            <div style={{ width: 300, height: 250 }}>
              <Pie data={pieData} options={{
                plugins: { legend: { position: 'bottom' } }
              }} />
            </div>
          </div>
        </div>

        {/* Tabla de ventas por barbero */}
        <h4 style={{ color: '#0057b7', marginTop: 40, marginBottom: 12 }}>Tabla de ventas por barbero</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr style={{ background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)', color: '#fff' }}>
              <th style={thStyle}>Barbero</th>
              <th style={thStyle}>Total ventas</th>
            </tr>
          </thead>
          <tbody>
            {barberos.map(barbero => (
              <tr key={barbero.idBarbero} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>{barbero.nombre}</td>
                <td style={tdStyle}>{ventas[barbero.idBarbero] !== undefined ? `$${ventas[barbero.idBarbero].toLocaleString('es-CO', { minimumFractionDigits: 0 })}` : 'Cargando...'}</td>
              </tr>
            ))}
            {barberos.length === 0 && (
              <tr>
                <td colSpan={2} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
                  No hay barberos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: 12,
  fontWeight: 700,
  fontSize: 16,
  border: 'none'
};

const tdStyle = {
  padding: 10,
  fontSize: 15,
  textAlign: 'center',
  background: '#fff',
  border: 'none'
};

const resumenBox = {
  background: 'linear-gradient(90deg, #0057b7 0%, #ffd700 100%)',
  color: '#fff',
  borderRadius: 10,
  padding: '18px 28px',
  minWidth: 180,
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
};

const resumenLabel = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 6
};

const resumenValor = {
  fontSize: 22,
  fontWeight: 800
};

export default AnalisisVentas;

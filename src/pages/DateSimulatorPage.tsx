import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';
import { useCart } from '../context/cart/useCart';
import { useAuth } from '../context/auth/useAuth';
import { promotionalDates } from '../data/promotionalDates';
import '../styles/DateSimulatorPage.css';

const DateSimulatorPage: React.FC = () => {
  const { simulateDate, setSimulateDate, isDatePromotional } = useCart();
  const { updateVipStatus } = useAuth();
  const [selectedDate, setSelectedDate] = useState<string>(
    format(simulateDate, 'yyyy-MM-dd')
  );

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleSimulateDate = () => {
    const newDate = parseISO(selectedDate);
    setSimulateDate(newDate);
    updateVipStatus(newDate); // Update VIP status when the date changes
  };

  const resetToCurrentDate = () => {
    const currentDate = new Date();
    setSelectedDate(format(currentDate, 'yyyy-MM-dd'));
    setSimulateDate(currentDate);
    updateVipStatus(currentDate); // Update VIP status when the date changes
  };

  return (
    <div className="date-simulator-page">
      <div className="container">
        <h1 className="page-title">Simulador de Fecha</h1>

        <div className="date-simulator-container">
          <div className="date-simulator-card">
            <div className="date-simulator-icon">
              <Calendar size={32} />
            </div>

            <h2>Simular una Fecha</h2>
            <p>
              Cambia la fecha del sistema para probar diferentes escenarios de promociones.
            </p>

            <div className="date-input-container">
              <label htmlFor="date-input">Selecciona una fecha:</label>
              <input
                type="date"
                id="date-input"
                value={selectedDate}
                onChange={handleDateChange}
                className="date-input"
              />
            </div>

            <div className="date-actions">
              <button
                className="simulate-btn"
                onClick={handleSimulateDate}
              >
                Simular Fecha
              </button>

              <button
                className="reset-btn"
                onClick={resetToCurrentDate}
              >
                Restablecer Fecha Actual
              </button>
            </div>

            <div className="current-date-display">
              <h3>Fecha Actual Simulada:</h3>
              <p className="simulated-date">
                {format(simulateDate, 'dd/MM/yyyy')}
              </p>

              <div className={`date-status ${isDatePromotional ? 'promotional' : 'normal'}`}>
                {isDatePromotional
                  ? '¡Fecha promocional activa!'
                  : 'No hay promociones en esta fecha'}
              </div>
            </div>
          </div>

          <div className="promotional-dates-card">
            <h2>Fechas Promocionales</h2>
            <p>
              Las siguientes fechas tienen promociones especiales disponibles:
            </p>

            <ul className="promotional-dates-list">
              {promotionalDates.map((date, index) => (
                <li key={index} className="promotional-date-item">
                  <span className="promotional-date-name">{date.name}:</span>
                  <span className="promotional-date-value">
                    {format(date.date, 'dd/MM/yyyy')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSimulatorPage;
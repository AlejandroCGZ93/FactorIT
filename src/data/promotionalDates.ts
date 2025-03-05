import { PromotionalDate } from '../types';

export const promotionalDates: PromotionalDate[] = [
  {
    date: new Date(new Date().getFullYear(), 11, 25), // Navidad
    name: 'Navidad'
  },
  {
    date: new Date(new Date().getFullYear(), 0, 1), // Año Nuevo
    name: 'Año Nuevo'
  },
  {
    date: new Date(new Date().getFullYear(), 4, 10), // Día de la Madre
    name: 'Día de la Madre'
  },
  {
    date: new Date(new Date().getFullYear(), 5, 20), // Día del Padre
    name: 'Día del Padre'
  },
  {
    date: new Date(new Date().getFullYear(), 1, 14), // San Valentín
    name: 'San Valentín'
  }
];
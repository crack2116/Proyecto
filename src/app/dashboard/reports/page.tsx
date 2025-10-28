"use client";

import { ServicePerformanceChart } from "@/components/reports/service-performance-chart";
import { VehicleUtilizationChart } from "@/components/reports/vehicle-utilization-chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FileSpreadsheet, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as ExcelJS from 'exceljs';
import html2canvas from 'html2canvas';

// Importar las funciones de generación de datos
function generateHistoricalData(selectedDate: Date) {
    const daysSinceEpoch = Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
    const variation = daysSinceEpoch % 100;
    
    return [
        { month: 'Ene', onTime: 75 + (variation % 10), delayed: 25 - (variation % 10) },
        { month: 'Feb', onTime: 80 + (variation % 8), delayed: 20 - (variation % 8) },
        { month: 'Mar', onTime: 85 + (variation % 7), delayed: 15 - (variation % 7) },
        { month: 'Abr', onTime: 83 + (variation % 9), delayed: 17 - (variation % 9) },
        { month: 'May', onTime: 87 + (variation % 8), delayed: 13 - (variation % 8) },
        { month: 'Jun', onTime: 90 + (variation % 7), delayed: 10 - (variation % 7) },
    ];
}

function generateHistoricalUtilization(selectedDate: Date) {
    const daysSinceEpoch = Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24));
    const baseUtilization = 70 + (daysSinceEpoch % 15);
    
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date(selectedDate);
        date.setDate(date.getDate() - i);
        const seed = (daysSinceEpoch + i) * 9301 + 49297;
        const pseudoRandom = (seed % 233280) / 233280;
        const dayUtilization = baseUtilization + (Math.sin(daysSinceEpoch + i) * 5) + (pseudoRandom * 5);
        data.push({
            date: date.toISOString().split('T')[0],
            utilization: Math.round(dayUtilization),
        });
    }
    
    return data;
}

export default function ReportsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const formattedDate = selectedDate 
    ? selectedDate.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : new Date().toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
  
  const isPastDate = selectedDate && selectedDate < new Date(new Date().setHours(0, 0, 0, 0));

  // Generar métricas dinámicas según la fecha seleccionada
  const daysSinceEpoch = selectedDate ? Math.floor(selectedDate.getTime() / (1000 * 60 * 60 * 24)) : 0;
  const variation = daysSinceEpoch % 50;
  
  const statsData = {
    totalServices: 200 + variation,
    punctuality: 85 + (variation % 10),
    utilization: 75 + (variation % 15),
    growth: '+' + (12 + (variation % 5)) + '%',
    punctualityGrowth: '+' + (5.2 + (variation % 3)) + '%',
    utilizationGrowth: '+' + (3.1 + (variation % 2)) + '%',
  };

  const handleExportPDF = () => {
    if (!selectedDate) return;
    
    // Obtener datos dinámicos
    const serviceData = generateHistoricalData(selectedDate);
    const utilizationData = generateHistoricalUtilization(selectedDate);
    
    // Agregar filas de la tabla de rendimiento
    const serviceRows = serviceData.map(item => 
      `<tr><td>${item.month}</td><td>${item.onTime}%</td><td>${item.delayed}%</td></tr>`
    ).join('');
    
    // Agregar filas de utilización
    const utilRows = utilizationData.map(item => {
      const date = new Date(item.date);
      const formattedDateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      return `<tr><td>${formattedDateStr}</td><td>${item.utilization}%</td></tr>`;
    }).join('');
    
    // Add print styles for better PDF export
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reporte - Mewing</title>
          <style>
            @page { margin: 20mm; }
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 2px solid #e5e7eb;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #2563eb;
              margin-bottom: 10px;
            }
            .date {
              color: #6b7280;
              font-size: 14px;
            }
            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin-bottom: 30px;
            }
            .metric-card {
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              padding: 15px;
              background: #f9fafb;
            }
            .metric-label {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 5px;
            }
            .metric-value {
              font-size: 24px;
              font-weight: bold;
              color: #1f2937;
            }
            .metric-trend {
              font-size: 11px;
              color: #059669;
              margin-top: 5px;
            }
            .chart-section {
              margin-bottom: 40px;
              page-break-inside: avoid;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              color: #1f2937;
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th, td {
              border: 1px solid #e5e7eb;
              padding: 10px;
              text-align: left;
            }
            th {
              background-color: #3b82f6;
              color: white;
              font-weight: bold;
            }
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🛻 Mewing Transport Manager</div>
            <div class="date">Fecha del Reporte: ${formattedDate}</div>
            <div class="date">Generado: ${new Date().toLocaleString('es-ES')}</div>
            <h1>Reporte de Transporte</h1>
          </div>
          
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-label">Servicios Totales</div>
              <div class="metric-value">${statsData.totalServices}</div>
              <div class="metric-trend">${statsData.growth} vs mes anterior</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Tasa de Puntualidad</div>
              <div class="metric-value">${statsData.punctuality}%</div>
              <div class="metric-trend">${statsData.punctualityGrowth} vs mes anterior</div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Utilización Promedio</div>
              <div class="metric-value">${statsData.utilization}%</div>
              <div class="metric-trend">${statsData.utilizationGrowth} vs mes anterior</div>
            </div>
          </div>
          
          <div class="chart-section">
            <h2 class="section-title">Rendimiento del Servicio - Últimos 6 Meses</h2>
            <table>
              <tr>
                <th>Mes</th>
                <th>Servicios a Tiempo (%)</th>
                <th>Servicios Retrasados (%)</th>
              </tr>
              ${serviceRows}
            </table>
          </div>
          
          <div class="chart-section">
            <h2 class="section-title">Utilización de Vehículos - Última Semana</h2>
            <table>
              <tr>
                <th>Fecha</th>
                <th>Utilización (%)</th>
              </tr>
              ${utilRows}
            </table>
          </div>
          
          <div class="footer">
            <p>Generado el ${formattedDate} - Mewing Transport Manager</p>
            <p>Este es un reporte generado automáticamente por el sistema de gestión de transporte.</p>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleExportExcel = async () => {
    if (!selectedDate) return;
    
    try {
      // Capturar gráficos como imágenes
      const serviceChartElement = document.getElementById('service-performance-chart');
      const utilizationChartElement = document.getElementById('vehicle-utilization-chart');
      
      let serviceChartImage: string | null = null;
      let utilizationChartImage: string | null = null;
      
      if (serviceChartElement) {
        const canvas = await html2canvas(serviceChartElement as HTMLElement, {
          backgroundColor: '#0a0a0a',
          scale: 2,
        });
        serviceChartImage = canvas.toDataURL('image/png');
      }
      
      if (utilizationChartElement) {
        const canvas = await html2canvas(utilizationChartElement as HTMLElement, {
          backgroundColor: '#0a0a0a',
          scale: 2,
        });
        utilizationChartImage = canvas.toDataURL('image/png');
      }
      
      // Obtener datos actuales
      const serviceData = generateHistoricalData(selectedDate);
      const utilizationData = generateHistoricalUtilization(selectedDate);
      
      // Crear libro de Excel con ExcelJS
      const workbook = new ExcelJS.Workbook();
      
      // Función helper para convertir base64 a ArrayBuffer
      const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
        const base64Data = base64.split(',')[1] || base64;
        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
      };
    
    // === 1. Hoja de Resumen ===
    const summarySheet = workbook.addWorksheet('Resumen');
    
    summarySheet.mergeCells('A1:D1');
    summarySheet.getCell('A1').value = 'MEWING TRANSPORT MANAGER';
    summarySheet.getCell('A1').font = { bold: true, size: 14 };
    summarySheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'middle' };
    
    summarySheet.mergeCells('A2:D2');
    summarySheet.getCell('A2').value = 'REPORTE DE TRANSPORTE';
    summarySheet.getCell('A2').font = { bold: true, size: 12 };
    summarySheet.getCell('A2').alignment = { horizontal: 'center' };
    
    summarySheet.getCell('A4').value = 'Fecha del Reporte:';
    summarySheet.getCell('B4').value = formattedDate;
    summarySheet.getCell('A5').value = 'Generado:';
    summarySheet.getCell('B5').value = new Date().toLocaleString('es-ES');
    
    summarySheet.mergeCells('A7:D7');
    summarySheet.getCell('A7').value = 'MÉTRICAS GENERALES';
    summarySheet.getCell('A7').font = { bold: true, size: 11 };
    
    summarySheet.getCell('A8').value = 'Métrica';
    summarySheet.getCell('B8').value = 'Valor';
    summarySheet.getCell('C8').value = 'Tendencia';
    
    summarySheet.getRow(8).font = { bold: true };
    
    summarySheet.getCell('A9').value = 'Servicios Totales';
    summarySheet.getCell('B9').value = statsData.totalServices;
    summarySheet.getCell('C9').value = statsData.growth;
    
    summarySheet.getCell('A10').value = 'Tasa de Puntualidad';
    summarySheet.getCell('B10').value = `${statsData.punctuality}%`;
    summarySheet.getCell('C10').value = statsData.punctualityGrowth;
    
    summarySheet.getCell('A11').value = 'Utilización Promedio';
    summarySheet.getCell('B11').value = `${statsData.utilization}%`;
    summarySheet.getCell('C11').value = statsData.utilizationGrowth;
    
    // Anchos de columnas
    summarySheet.getColumn(1).width = 25;
    summarySheet.getColumn(2).width = 15;
    summarySheet.getColumn(3).width = 15;
    
    // === 2. Hoja de Rendimiento ===
    const renderSheet = workbook.addWorksheet('Rendimiento');
    
    renderSheet.mergeCells('A1:C1');
    renderSheet.getCell('A1').value = 'RENDIMIENTO DEL SERVICIO - ÚLTIMOS 6 MESES';
    renderSheet.getCell('A1').font = { bold: true };
    renderSheet.getCell('A1').alignment = { horizontal: 'center' };
    
    renderSheet.getCell('A3').value = 'Mes';
    renderSheet.getCell('B3').value = 'Servicios a Tiempo (%)';
    renderSheet.getCell('C3').value = 'Servicios Retrasados (%)';
    renderSheet.getRow(3).font = { bold: true };
    
    serviceData.forEach((item, index) => {
      renderSheet.getCell(`A${index + 4}`).value = item.month;
      renderSheet.getCell(`B${index + 4}`).value = item.onTime;
      renderSheet.getCell(`C${index + 4}`).value = item.delayed;
    });
    
    renderSheet.getColumn(1).width = 15;
    renderSheet.getColumn(2).width = 25;
    renderSheet.getColumn(3).width = 25;
    
      // Agregar gráfico si existe
    if (serviceChartImage) {
      try {
        const buffer = base64ToArrayBuffer(serviceChartImage);
        const imageId = workbook.addImage({
          buffer,
          extension: 'png',
        });
        
        renderSheet.addImage(imageId, {
          tl: { col: 0, row: 10 },
          ext: { width: 600, height: 350 },
        });
      } catch (error) {
        console.error('Error al agregar la imagen del gráfico de servicio:', error);
      }
    }
    
    // === 3. Hoja de Utilización ===
    const utilSheet = workbook.addWorksheet('Utilización');
    
    utilSheet.mergeCells('A1:B1');
    utilSheet.getCell('A1').value = 'UTILIZACIÓN DE VEHÍCULOS - ÚLTIMA SEMANA';
    utilSheet.getCell('A1').font = { bold: true };
    utilSheet.getCell('A1').alignment = { horizontal: 'center' };
    
    utilSheet.getCell('A3').value = 'Fecha';
    utilSheet.getCell('B3').value = 'Utilización (%)';
    utilSheet.getRow(3).font = { bold: true };
    
    utilizationData.forEach((item, index) => {
      const date = new Date(item.date);
      const formattedDateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      utilSheet.getCell(`A${index + 4}`).value = formattedDateStr;
      utilSheet.getCell(`B${index + 4}`).value = item.utilization;
    });
    
    utilSheet.getColumn(1).width = 15;
    utilSheet.getColumn(2).width = 20;
    
    // Agregar gráfico si existe
    if (utilizationChartImage) {
      try {
        const buffer = base64ToArrayBuffer(utilizationChartImage);
        const imageId = workbook.addImage({
          buffer,
          extension: 'png',
        });
        
        utilSheet.addImage(imageId, {
          tl: { col: 0, row: 12 },
          ext: { width: 600, height: 350 },
        });
      } catch (error) {
        console.error('Error al agregar la imagen del gráfico de utilización:', error);
      }
    }
    
    // === 4. Hoja de Detalle Diario ===
    const detailSheet = workbook.addWorksheet('Detalle Diario');
    
    detailSheet.mergeCells('A1:D1');
    detailSheet.getCell('A1').value = 'RESUMEN DE DATOS POR FECHA';
    detailSheet.getCell('A1').font = { bold: true };
    
    detailSheet.getCell('A3').value = 'Fecha';
    detailSheet.getCell('B3').value = 'Servicios Totales';
    detailSheet.getCell('C3').value = 'Puntualidad %';
    detailSheet.getCell('D3').value = 'Utilización %';
    detailSheet.getRow(3).font = { bold: true };
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(selectedDate);
      date.setDate(date.getDate() - i);
      const dayServices = statsData.totalServices + (i * 2);
      const dayPunctuality = statsData.punctuality - (i % 3);
      const util = utilizationData[6 - i]?.utilization || 75;
      
      const rowIndex = 4 + (6 - i);
      detailSheet.getCell(`A${rowIndex}`).value = date.toLocaleDateString('es-ES');
      detailSheet.getCell(`B${rowIndex}`).value = dayServices;
      detailSheet.getCell(`C${rowIndex}`).value = dayPunctuality;
      detailSheet.getCell(`D${rowIndex}`).value = util;
    }
    
    detailSheet.getColumn(1).width = 15;
    detailSheet.getColumn(2).width = 18;
    detailSheet.getColumn(3).width = 15;
    detailSheet.getColumn(4).width = 15;
    
      // Descargar archivo
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte-mewing-${selectedDate.toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar Excel:', error);
      alert('Error al exportar el archivo Excel. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with export buttons */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-headline font-bold tracking-tight">Reportes y Analíticas</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 hover:bg-primary/10">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{formattedDate}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  disabled={(date) => date > new Date()}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">Analiza el rendimiento y optimiza tus operaciones.</p>
            {isPastDate && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                Reporte Histórico
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleExportExcel} variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar Excel</span>
            <span className="sm:hidden">Excel</span>
          </Button>
          <Button onClick={handleExportPDF} variant="outline" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Rendimiento del Servicio</CardTitle>
                <CardDescription className="mt-1">Servicios a Tiempo vs. Retrasados (Últimos 6 Meses)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ServicePerformanceChart selectedDate={selectedDate} />
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Utilización de Vehículos</CardTitle>
                <CardDescription className="mt-1">Porcentaje de Uso Semanal de Vehículos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <VehicleUtilizationChart selectedDate={selectedDate} />
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Servicios Totales</CardDescription>
            <CardTitle className="text-2xl">{statsData.totalServices}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{statsData.growth} vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tasa de Puntualidad</CardDescription>
            <CardTitle className="text-2xl">{statsData.punctuality}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{statsData.punctualityGrowth} vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Utilización Promedio</CardDescription>
            <CardTitle className="text-2xl">{statsData.utilization}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{statsData.utilizationGrowth} vs mes anterior</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

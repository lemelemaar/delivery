import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import {
	Box,
	Container,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	CircularProgress,
} from "@mui/material";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

import {
	LocalizationProvider,
	DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(minMax);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


function DeliveryReport() {
	const [loading, setLoading] = useState(true);
	const [deliveries, setDeliveries] = useState([]);
	const [services, setServices] = useState([]);
	const [packagingTypes, setPackagingTypes] = useState([]);
	const [statuses, setStatus] = useState([]);
	const [filters, setFilters] = useState({
		startDate: dayjs('2025-01-01'),
    	endDate: dayjs('2025-01-10'),
    	service: '',
    	packaging: '',
    	status: '',
	});

	const navigate = useNavigate();

  	// Проверка авторизации csrf
  	useEffect(() => {
		axios.get("http://localhost:8000/api/check-auth/", { withCredentials: true })
    	.then(() => setLoading(false))
    	.catch((err) => {
			console.error("Auth check failed:", err);
			navigate("/");
		});
	}, [navigate]);

  	// Получение доставок, установка дат
  	useEffect(() => {
		axios.get("http://localhost:8000/api/deliveries/").then(res => {
			const all = res.data;
			setDeliveries(all);

			const allDates = all
			.map(d => dayjs(d.date_delivery))
			.filter(d => d.isValid());
			
			if (allDates.length > 0) {
				setFilters(prev => ({
					...prev,
					startDate: dayjs.min(allDates),
					endDate: dayjs.max(allDates),
				}));
			}
		});
	}, []);

	useEffect(() => {
		axios.get('http://localhost:8000/api/services/').then(res => setServices(res.data));
		axios.get('http://localhost:8000/api/types-of-packing/').then(res => setPackagingTypes(res.data));
    	axios.get('http://localhost:8000/api/delivery-status/').then(res => setStatus(res.data));
	}, []);

  	// Изменение фильтров
  	useEffect(() => {
		if (!filters.startDate || !filters.endDate) return;
		
		const params = {
			date_delivery__gte: filters.startDate.format('YYYY-MM-DD'),
      		date_delivery__lte: filters.endDate.format('YYYY-MM-DD'),
			...(filters.service && { services: filters.service }),
      		...(filters.packaging && { types_of_packaging: filters.packaging }),
      		...(filters.status && {delivery_status: filters.status}),
		};
		
		axios.get("http://localhost:8000/api/deliveries/", { params }).then(res => {
			setDeliveries(res.data);
		});
	}, [filters]);

  	// Фильтрованные доставки для таблицы
  	const filteredDeliveries = deliveries.filter(d => {
		const date = dayjs(d.date_delivery);
		
		return (
			date.isSameOrAfter(filters.startDate, 'day') &&
      		date.isSameOrBefore(filters.endDate, 'day') &&
      		(!filters.service || d.services.id === Number(filters.service)) &&
      		(!filters.packaging || d.types_of_packaging.id === Number(filters.packaging)) &&
      		(!filters.status || d.delivery_status.id === Number(filters.status))
		);
	});

  	// Обработка графика
  	const chartData = Object.entries(
		filteredDeliveries.reduce((acc, d) => {
			const date = dayjs(d.date_delivery).format('DD.MM');
			acc[date] = (acc[date] || 0) + 1;
			return acc;
		}, {})
	).sort(([a], [b]) => {
		const dateA = dayjs(a, 'DD.MM');
		const dateB = dayjs(b, 'DD.MM');
		return dateA.isBefore(dateB) ? -1 : 1;
	}).map(([date, count]) => ({ date, count }));

  	// Загрузка
  	if (loading) {
		return (
		<Container sx={{ mt: 8 }}>
			<CircularProgress />
      	</Container>
		);
	}

  	return (
	<Container sx={{ mt: 4 }}>
		<Typography variant="h4" gutterBottom>Отчет по доставкам</Typography>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box display="flex" gap={2} mb={3} flexWrap="wrap">

				<DatePicker 
				label="Начало"
            	value={filters.startDate}
            	onChange={(newValue) => setFilters(prev => ({ ...prev, startDate: newValue }))}
            	format="DD.MM.YY"
				/>
          		<DatePicker
            	label="Конец"
            	value={filters.endDate}
            	onChange={(newValue) => setFilters(prev => ({ ...prev, endDate: newValue }))}
            	format="DD.MM.YY"
          		/>

          		<TextField
            	select
            	label="Услуга"
            	value={filters.service}
            	onChange={(e) => setFilters(prev => ({ ...prev, service: e.target.value }))}
            	sx={{ width: 'auto', minWidth: '100px' }}
				>
					<MenuItem value="">Все</MenuItem>
					{services.map(s => (
						<MenuItem key={s.id} value={s.id}>{s.title}</MenuItem>
						))}
          		</TextField>
          		<TextField
            	select
            	label="Тип упаковки"
            	value={filters.packaging}
            	onChange={(e) => setFilters(prev => ({ ...prev, packaging: e.target.value }))}
            	sx={{ width: 'auto', minWidth: '150px' }}
          		>
            		<MenuItem value="">Все</MenuItem>
            		{packagingTypes.map(p => (
              			<MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
						))}
          		</TextField>
          		<TextField
            	select
            	label="Статус доставки"
            	value={filters.status}
            	onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            	sx={{ width: 'auto', minWidth: '180px' }}
          		>
            		<MenuItem value="">Все</MenuItem>
            		{statuses.map(ss => (
              			<MenuItem key={ss.id} value={ss.id}>{ss.title}</MenuItem>
						))}
          		</TextField>

        	</Box>
      	</LocalizationProvider>

      	<Paper sx={{ p: 2, mb: 3 }}>
			<Typography variant="h6" gutterBottom>Количество доставок</Typography>
        	<ResponsiveContainer width="100%" height={250}>
          		<LineChart data={chartData}>
            		<CartesianGrid strokeDasharray="3 3" />
            		<XAxis dataKey="date" />
            		<YAxis allowDecimals={false} />
            		<Tooltip />
            		<Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} />
          		</LineChart>
        	</ResponsiveContainer>
      	</Paper>

      	<TableContainer component={Paper}>
        	<Typography variant="h6" sx={{ p: 2 }}>Итого</Typography>
        	<Table>
          		<TableHead>
            		<TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
              			<TableCell>Наименование</TableCell>
              			<TableCell>Модель ТС</TableCell>
              			<TableCell>Тип упаковки</TableCell>
              			<TableCell>Услуга</TableCell>
              			<TableCell>Статус доставки</TableCell>
              			<TableCell>Тип груза</TableCell>
              			<TableCell>Дистанция (км)</TableCell>
              			<TableCell>Дата доставки</TableCell>
            		</TableRow>
          		</TableHead>
          		<TableBody>
            		{filteredDeliveries.map((row, i) => (
						<TableRow key={i}>
                			<TableCell>{row.title}</TableCell>
                			<TableCell>{row.transport_models}</TableCell>
                			<TableCell>{row.types_of_packaging.title}</TableCell>
                			<TableCell>{row.services.title}</TableCell>
                			<TableCell>{row.delivery_status.title}</TableCell>
                			<TableCell>{row.types_of_cargo}</TableCell>
                			<TableCell>{row.distance}</TableCell>
                			<TableCell>{dayjs(row.date_delivery).format('DD.MM.YYYY')}</TableCell>
              			</TableRow>
					))}
          		</TableBody>
        	</Table>
      	</TableContainer>
    </Container>
  );
}

export default DeliveryReport;

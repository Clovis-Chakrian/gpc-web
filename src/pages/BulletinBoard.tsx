import { Menu } from '../components/Exports';
import { CloseMenu } from '../components/Menu';
import '../styles/pages/bulletinBoard.css';
import { useEffect, useState } from 'react';
import { INotice } from '../@types';
import api from '../services/api';

export function BulletinBoard() {
	const schoolClasses: string[] = JSON.parse(String(localStorage.getItem('schoolClasses')));
	const [notices, setNotices] = useState<INotice[]>([]);
	const [selectedClass, setSelectedClass] = useState<string>(schoolClasses[0]);
	document.title = 'Mural de avisos';

	async function handleGetNotices(schoolClass: string) {
		await api.http.get('/notices', {
			params: {
				schoolClass: schoolClass
			}
		}).then(resp => {
			setNotices(resp.data);
		}).catch(err => {
			console.error(err);
			alert('Houve um erro ao buscar os avisos, tente novamente mais tarde.')
		});
	};

	useEffect(() => {
		handleGetNotices(selectedClass);
	}, [selectedClass])

	return (

		<div className="container">
			<Menu />

			<div className="bulletinBoard-container" onClick={CloseMenu}>

				<main className="BulletinBoard-content">

					<h3 style={{ margin: 10 }}>Selecione a turma abaixo</h3>
					<div className='bulletinBoard-schoolClasses'>
						{
							schoolClasses.map(schoolClass => {
								return <h4 style={{ textDecoration: 'underline' }} onClick={() => setSelectedClass(schoolClass)} key={schoolClass}>Turma: {schoolClass}</h4>
							})
						}
					</div>

					<div className="content">
						{
							notices.map(notice => {
								return (
									<>
										<h4>{notice.title}</h4>
										<p>{notice.description}</p>
									</>
								);
							})
						}
					</div>


				</main>

			</div>

		</div>

	);
}
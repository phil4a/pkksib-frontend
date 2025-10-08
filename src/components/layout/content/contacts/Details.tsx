import { Title } from '@/ui/title/Title';

export function Details() {
	return (
		<div className='p-10 border-1 border-light-gray rounded-xl'>
			<Title
				type='h2'
				className='text-[22px] font-semibold'
			>
				Реквизиты
			</Title>
			<ul>
				<li>ООО "ПЕРВАЯ КРОВЕЛЬНАЯ КОМПАНИЯ"</li>
				<li>ИНН: 5402005375</li>
				<li>КПП: 540201001</li>
				<li>ОГРН: 1155476043535</li>
				<li>Расчетный счет: 40702810823400000324</li>
				<li>Банк: Филиал "НОВОСИБИРСКИЙ" АО "АЛЬФА-БАНК"</li>
				<li>БИК: 045004774</li>
				<li>Корр. счет: 30101810600000000774</li>
				<li>
					Юридический адрес: 630123, Новосибирская обл, Новосибирск, 1-е Мочищенское ш, дом №20
				</li>
				<li>Телефон: +7 (383) 310-14-88</li>
			</ul>
		</div>
	);
}

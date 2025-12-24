import { Title } from '@/ui/title/Title';

export function Details() {
	return (
		<div className='p-6 lg:p-10 border-1 border-light-gray rounded-xl'>
			<Title
				type='h2'
				className='text-[22px] font-semibold'
			>
				Реквизиты
			</Title>
			<ul>
				<li>ООО &quot;ПЕРВАЯ КРОВЕЛЬНАЯ КОМПАНИЯ&quot;</li>
				<li>ИНН: 5402005375</li>
				<li>КПП: 540201001</li>
				<li>ОГРН: 1155476043535</li>
				<li>Расчетный счет: 40702810823400000324</li>
				<li>Банк: Филиал &quot;НОВОСИБИРСКИЙ&quot; АО &quot;АЛЬФА-БАНК&quot;</li>
				<li>БИК: 045004774</li>
				<li>Корр. счет: 30101810600000000774</li>
				<li>
					Юридический адрес: 630001, Новосибирская обл, Новосибирск, Владимировская 26/1, офис 410
				</li>
				<li>Телефон: +7 (383) 310-14-88</li>
			</ul>
		</div>
	);
}

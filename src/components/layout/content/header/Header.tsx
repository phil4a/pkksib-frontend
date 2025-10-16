import { Logo } from '../logo/Logo';
import { Menu } from '../menu/Menu';

import { HeaderActions } from './HeaderActions';
import { HeaderTop } from './HeaderTop';

export function Header() {
	return (
		<>
			<HeaderTop />
			<div className='layout-container flex gap-6 justify-between items-center py-2'>
				<Logo />
				<Menu />
				<div className='hidden lg:block'>
					<HeaderActions />
				</div>
			</div>
		</>
	);
}

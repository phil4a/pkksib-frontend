import { unitsEnum } from '@/types/service.types';

export const UNIT_LABELS: Record<unitsEnum, string> = {
	[unitsEnum.SQUARE_METERS]: 'м²',
	[unitsEnum.QUBIC_METERS]: 'м³'
};

export function formatUnit(unit?: unitsEnum | null): string {
	if (!unit) return 'м²';
	return UNIT_LABELS[unit] ?? String(unit);
}

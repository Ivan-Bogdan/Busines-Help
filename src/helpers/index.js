export const getNameOtype = (otype, name) => {
	switch (otype) {
		case 0:
			return `ИП ${name ? `"${name}"` : ''}`;
		case 1:
			return `ООО ${name ? `"${name}"` : ''}`;
		case 2:
			return `ОАО ${name ? `"${name}"` : ''}`;
		case 3:
			return `ЧУП ${name ? `"${name}"` : ''}`;
		case 4:
			return `ЧТУП ${name ? `"${name}"` : ''}`;
		case 5:
			return `ИНОЕ ${name ? `"${name}"` : ''}`;
		case 6:
			return `Ф/Л ${name ? `${name}` : ''}`;
		case 7:
			return `СООО "${name}"`;
		case 8:
			return `ЧП "${name}"`;
		case 9:
			return `УП "${name}"`;
	}
};

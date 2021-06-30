export const getNameOtype = (otype, name, patronomic, family) => {
	switch (otype) {
		case 0:
			return `ИП ${
				name && patronomic && family ? `${family} ${name} ${patronomic}` : ''
			}`;
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
			return `Ф/Л ${
				name && patronomic && family ? `${family} ${name} ${patronomic}` : ''
			}`;
		case 7:
			return `СООО ${name ? `"${name}"` : ''}`;
		case 8:
			return `ЧП ${name ? `"${name}"` : ''}`;
		case 9:
			return `УП ${name ? `"${name}"` : ''}`;
	}
};

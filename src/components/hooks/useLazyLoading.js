import { useState, useCallback, useEffect } from 'react';

export function useLazyLoading(containerBox, count, listFn, selectedTaskPage) {
	const [fetching, setFetching] = useState(true);
	const [windowHeight, setWindowHeight] = useState(window.innerHeight);
	const [height, setHeight] = useState(0);

	const scrollHandler = useCallback(
		(e) => {
			if (
				e.target.documentElement.scrollHeight -
					(e.target.documentElement.scrollTop + window.innerHeight) <
					100 &&
				Math.ceil(count / 10) > selectedTaskPage
			) {
				setFetching(true);
			}
		},
		[count, selectedTaskPage]
	);

	const handleResize = useCallback(() => {
		setWindowHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		document.addEventListener('scroll', scrollHandler);
		return () => {
			document.removeEventListener('scroll', scrollHandler);
		};
	}, [fetching]);

	useEffect(() => {
		if (fetching && localStorage.getItem('token')) {
			listFn();
		}
	}, [fetching]);

	useEffect(() => {
		console.log('count', count);
		console.log('selectedTaskPage', selectedTaskPage);
		if (
			height !== 0 &&
			windowHeight !== 0 &&
			windowHeight > height &&
			selectedTaskPage !== 0 &&
			Math.ceil(count / 10) > selectedTaskPage
		) {
			listFn();
		}
	}, [height, windowHeight, count, selectedTaskPage]);

	useEffect(() => {
		setHeight(containerBox && containerBox.current.clientHeight);
	});

	return { setFetching };
}

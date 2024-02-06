import React, {useState, useRef, useEffect} from 'react';
import isBoolean from 'lodash/isBoolean';

const Drawer = ({
	renderTrigger = ({onClick}) => <button onClick={onClick} />,
	transition = 'height 400ms ease',
	openByDefault = false,
	open,
	children,
}) => {
	const heightEl = useRef(null);
	const [isOpen, setIsOpen] = useState(openByDefault);
	const [height, setHeight] = useState(0);
	const statefulOpen = isBoolean(open) ? open : isOpen;

	const onResize = () => {
		if (!heightEl.current) return;

		setHeight(heightEl.current.getBoundingClientRect().height);
	};

	const onClickTrigger = () => {
		onResize();
		setIsOpen(!isOpen);
	};

	// Remeasure height on resize
	useEffect(() => {
		window.addEventListener('resize', onResize);
		onResize();

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	// Remeasure height on toggle
	useEffect(onResize, [statefulOpen]);

	return (
		<div className='w-full relative block'>
			{renderTrigger({
				onClick: onClickTrigger,
				isOpen: statefulOpen,
			})}
			<div
				style={{
					height: statefulOpen ? height : 0,
					transition,
				}}
				className="overflow-hidden">
				<div ref={heightEl}>{children}</div>
			</div>
		</div>
	);
};

export default Drawer;

import React, {Fragment} from 'react';
import dynamic from 'next/dynamic';

const COMPONENTS = {
	// aboutDescription: dynamic(() => import('./AboutDescription')),
};

const PageComponentList = ({components = []}) => {
	const rows = components.map((component, index) => {
		const Component = COMPONENTS[component._type];

		if (!Component)
			return <div className="p-4">missing - {component._type}</div>;

		return <Component index={index} key={component._key} {...component} />;
	});

	const componentsList = rows.map((row, index) => {
		return (
			<Fragment key={index}>
				{row}
			</Fragment>
		);
	});

	return <React.Fragment>{componentsList}</React.Fragment>;
};

export default PageComponentList;

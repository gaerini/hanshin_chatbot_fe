import React from 'react';
import Icon from '../icon/icon';
import { useActiveItemContext } from './activeItemContext';

const ProjectBadge: React.FC = () => {
    const { selectedProject } = useActiveItemContext();

    if (!selectedProject) return null;

    return (
        <div className="px-1.5 py-0.5 bg-blue-100 rounded-lg justify-start items-center gap-0.5 inline-flex
                        fill-blue-500 text-blue-500 text-caption font-medium">
            <Icon name ="building" width={12} height={12} />
            {selectedProject}
        </div>
    );
};

export default ProjectBadge;
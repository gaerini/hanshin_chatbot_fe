import React from 'react';
import Icon from '../../../../basicComponents/icon/Icon';

interface ProjectBadgeProps {
    badgeProject: string | null;
}

const ProjectBadge: React.FC<ProjectBadgeProps> = ({ badgeProject }) => {
    if (!badgeProject) return null;

    return (
        <div className="px-1.5 py-0.5 bg-blue-100 border border-blue-200 rounded-lg justify-start items-center gap-0.5 inline-flex
                        fill-blue-500 text-blue-500 text-caption font-medium">
            <Icon name ="building" width={12} height={12} />
            {badgeProject}
        </div>
    );
};

export default ProjectBadge;

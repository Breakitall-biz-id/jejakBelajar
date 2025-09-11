import { Badge } from './badge';

interface StatusBadgeProps {
    status: string;
    labels: Record<string, { label: string; className: string }>;
}

export function StatusBadge({ status, labels }: StatusBadgeProps) {
    return (
        <Badge className={labels[status]?.className || ''} variant="outline">
            {labels[status]?.label || status}
        </Badge>
    );
}

export type Image = {
    id: number;
    src: string;
    alt: string;
    details: string;
};

export type Props = {
    images: Image[];
};

export let interval: NodeJS.Timeout;

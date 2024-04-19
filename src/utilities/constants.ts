const NO_OF_ITEMS: number = 1;
const END_ELEMENT_SIZE: number = 1;
const END_ELEMENT_BUFFER: number = 10;
const HIGHER_Z_INDEX: number = 99999;

const HIDE_SCROLLBAR: string = `
    .scrollable::-webkit-scrollbar {
        display: none;
    }

    .scrollable {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;

export {
    NO_OF_ITEMS,
    END_ELEMENT_SIZE,
    END_ELEMENT_BUFFER,
    HIGHER_Z_INDEX,
    HIDE_SCROLLBAR
};

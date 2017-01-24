/**
 * Кнопки-переключатели
 * 
 * @module
 */
;

/**
 * Кнопки-переключатели
 */
function main(block: Element, change: (event: Event) => void ): void
{
    const onChange = (event: Event): void =>
        {
            change(event);
        };
    block.addEventListener( 'change', onChange );
}

/**
 * Модуль
 */
export {
	main as default,
};
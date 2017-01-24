/**
 * Модуль доступа к svg-изображению
 * 
 * @module
 */
;

/**
 * SVG-изображение
 */
class SVGFileElements
{
    /**
	 * Элемент SVG
	 */
	public svgDocument: HTMLElement;

	/**
	 * Название неотображающегося класса
	 */
	private notDisplayedClass = 'st0';

	/**
	 * SVG-изображение
	 * 
	 * @param id Id изображения
	 */
	public constructor( id: string )
	{
		this.svgDocument = document.getElementById( id ) as HTMLElement;
		if ( this.svgDocument == null )
		{
			throw new Error( 'No SVG found in page' );
		}

	}

	/**
	 * Сделать элемент видимым
	 * 
	 * param id Id элемента
	 * returns
	 */
	public switchElementOn( id: string ): void
	{
		const layer = this.svgDocument.children.namedItem( id ) as HTMLElement;
		if ( layer == null )
		{
			throw new Error( 'SVG: No such layer' );
		}
		if ( layer.classList.contains( this.notDisplayedClass ))
		{
			layer.removeAttribute( 'class' );
		}
	}

	/**
	 * Сделать элемент невидимым
	 * 
	 * param id Id элемента
	 * returns
	 */	
	public switchElementOff( id: string ): void
	{
		const layer = this.svgDocument.children.namedItem( id ) as HTMLElement;
		if ( layer == null )
		{
			throw new Error( 'SVG: No such layer' );
		}
		layer.classList.add( this.notDisplayedClass );
	}
}

/**
 * Модуль
 */
export {
	SVGFileElements as default,
};
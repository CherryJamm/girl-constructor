/**
 * Модуль инициализации инструментов изменения файла
 */
;

import initSaveButton from './initSaveButton';

import initButtons from './initButtons';

import SVGFileElements from './SVGFileElements';


/**
 * Предыдущая нажатая кнопка в блоке губ
 */
let previousElementLips: HTMLInputElement;

/**
 * Предыдущая нажатая кнопка в блоке глаз
 */
let previousElementEyes: HTMLInputElement;

/**
 * Предыдущая нажатая кнопка в блоке волос
 */
let previousElementHair: HTMLInputElement;

/**
 * Предыдущая нажатая кнопка в блоке рук
 */
let previousElementHand: HTMLInputElement;

/**
 * Предыдущая нажатая кнопка в блоке прочего
 */
let previousElementOther: HTMLInputElement;

/**
 * Инициализия инструментов изменения файла
 */
function main( ): void
{
	const svgDocument = new SVGFileElements( 'main-canvas' );
	initstartElements();
	initChangeSVG( 'block', svgDocument );
	initSave();
}

/**
 * Инициализация стартового состояния указателей на предыдущие элементы
 * @returns
 */
function initstartElements( ): void
{
	previousElementLips = document.getElementById( 'lips_1' ) as HTMLInputElement;
	previousElementEyes = document.getElementById( 'eyes_1' ) as HTMLInputElement;
	previousElementHair = document.getElementById( 'hair_2' ) as HTMLInputElement;
	previousElementHand = document.getElementById( 'hand_6' ) as HTMLInputElement;
	previousElementOther = document.getElementById( 'sparkles' ) as HTMLInputElement;

}

/**
 * Инициализация инструментов
 * 
 * @param buttonGroupName Имя группы кнопок
 * @param svgDocument 
 * @returns
 */
function initChangeSVG( buttonGroupName: string, svgDocument: SVGFileElements ): void
{
	const input = document.getElementsByClassName( buttonGroupName ) as NodeListOf<Element>;

	const onChecked = ( event: Event ): void => 
	{	
		if ( event == undefined )
		{
			return;
		}
		const target = event.target as HTMLInputElement;
		if ( target.name == undefined )
		{
			return;
		}
		switch ( target.name )
		{
			case 'lips':
				svgDocument.switchElementOff( previousElementLips.id );
				previousElementLips = target;
				break;
			case 'eyes':
				svgDocument.switchElementOff( previousElementEyes.id );
				previousElementEyes = target;
				break;
			case 'hair':
				svgDocument.switchElementOff( previousElementHair.id );
				previousElementHair = target;
				break;
			case 'hand':
				svgDocument.switchElementOff( previousElementHand.id );
				previousElementHand = target;
				break;
			case 'other':
				svgDocument.switchElementOff( previousElementOther.id );
				previousElementOther = target;
				break;					
		}
		svgDocument.switchElementOn( target.id );
	}
	for( let i = 0; i < input.length; i++ )
	{
		initButtons( input[i], onChecked );
	}
}

/**
 * Инициализация функции сохранения холста
 * 
 * @returns
 */
function initSave( ): void
{
	const button = document.getElementById( 'save' ) as HTMLAnchorElement;
	if ( !button )
	{
		return;
	}
	const link = getSVGFileLinkFromElement( 'main-canvas' );
	const onSave = ( save: ( link: string ) => void ): void =>
	{
		const link = getSVGFileLinkFromElement( 'main-canvas' );
		window.requestAnimationFrame(
			() =>
				window.requestAnimationFrame(
					() =>
					{
						save( link );
					}
				)
		);
	};
	
	initSaveButton(
		button, 
		link, 
		onSave);
}

/**
 * Формирование ссылки на сохранение svg-файла
 * 
 * @param id Id svg-элемента 
 * @returns Ссылка на скачивание
 */
function getSVGFileLinkFromElement( id: string ): string
{
	const svg = document.getElementById( id ) as Node;
	const serializer = new XMLSerializer();
	let source = serializer.serializeToString(svg);
	if ( !source.match( /^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/ ) )
	{
		source = source.replace( /^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"' );
	}
	if ( !source.match( /^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/ ) )
	{
		source = source.replace( /^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"' );
	}
	source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
	const link = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent( source );
	return link;
}

/**
 * Модуль
 */
export {
	main as default,
};
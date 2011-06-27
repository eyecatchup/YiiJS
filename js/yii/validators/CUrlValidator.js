/*global Yii, php, $, jQuery, alert, clearInterval, clearTimeout, document, event, frames, history, Image, location, name, navigator, Option, parent, screen, setInterval, setTimeout, window, XMLHttpRequest */
/**
 * CUrlValidator validates that the attribute value is a valid http or https URL.
 * 
 * @originalAuthor Qiang Xue <qiang.xue@gmail.com>
 * @version $Id: CUrlValidator.php 3120 2011-03-25 01:50:48Z qiang.xue $
 * @package system.validators
 * @since 1.0
 * @author Charles Pick
 * @class
 * @extends Yii.CValidator
 */
Yii.CUrlValidator = function CUrlValidator() {
	
};
Yii.CUrlValidator.prototype = new Yii.CValidator();
Yii.CUrlValidator.prototype.constructor =  Yii.CUrlValidator;
/**
 * @var {String} the regular expression used to validate the attribute value.
 * Since version 1.1.7 the pattern may contain a {schemes} token that will be replaced
 * by a regular expression which represents the {@see validSchemes}.
 */
Yii.CUrlValidator.prototype.pattern = '^{schemes}:\\/\\/(([A-Z0-9][A-Z0-9_-]*)(\\.[A-Z0-9][A-Z0-9_-]*)+)';
/**
 * @var {Array} list of URI schemes which should be considered valid. By default, http and https
 * are considered to be valid schemes.
 * @since 1.1.7
 */
Yii.CUrlValidator.prototype.validSchemes = ['http','https'];
/**
 * @var {String} the default URI scheme. If the input doesn't contain the scheme part, the default
 * scheme will be prepended to it (thus changing the input). Defaults to null, meaning a URL must
 * contain the scheme part.
 * @since 1.1.7
 */
Yii.CUrlValidator.prototype.defaultScheme = null;
/**
 * @var {Boolean} whether the attribute value can be null or empty. Defaults to true,
 * meaning that if the attribute is empty, it is considered valid.
 */
Yii.CUrlValidator.prototype.allowEmpty = true;
/**
 * Validates the attribute of the object.
 * If there is any error, the error message is added to the object.
 * @param {Yii.CModel} object the object being validated
 * @param {String} attribute the attribute being validated
 */
Yii.CUrlValidator.prototype.validateAttribute = function (object, attribute) {
		var value, message;
		value=object.get(attribute);
		if(this.allowEmpty && this.isEmpty(value)) {
			return;
		}
		if((value=this.validateValue(value))!==false) {
			object[attribute]=value;
		}
		else {
			message=this.message!==null?this.message:Yii.t('yii','{attribute} is not a valid URL.');
			this.addError(object,attribute,message);
		}
	};
/**
 * Validates a static value to see if it is a valid URL.
 * Note that this method does not respect {@link allowEmpty} property.
 * This method is provided so that you can call it directly without going through the model validation rule mechanism.
 * @param {Mixed} value the value to be validated
 * @returns {Mixed} false if the the value is not a valid URL, otherwise the possibly modified value ({@see defaultScheme})
 * @since 1.1.1
 */
Yii.CUrlValidator.prototype.validateValue = function (value) {
		var pattern, re;
		if(typeof(value) === 'string')	{
			if(this.defaultScheme!==null && php.strpos(value,'://')===false) {
				value=this.defaultScheme+'://'+value;
			}
			if(php.strpos(this.pattern,'{schemes}')!==false) {
				pattern=php.str_replace('{schemes}','('+this.validSchemes.join('|')+')',this.pattern);
			}
			else {
				pattern=this.pattern;
			}
			re = new RegExp(this.pattern,"i");
			if(re.exec(value)) {
				return value;
			}
		}
		return false;
	};

import {containsSpecialChars, isNumeric, validateEmail} from "utils/index";
import templateSettings from "lodash/templateSettings"
import template from "lodash/template"

const messages = {
    required: 'The :attribute is required',
    present: 'The :attribute should be is present',
    isEmail: 'The :attribute must be valid email address',
    number: 'The :attribute should be is number',
    shouldContainsLowerCaseCharacters: 'The :attribute must have lowercase characters',
    shouldContainsUpperCaseCharacters: 'The :attribute must have uppercase characters',
    minLength: 'The :attribute must be at least :value characters',
    maxLength: 'The :attribute must be no more than :value characters',
    equalTo: 'The field should be equal to :attribute',
    shouldContainsSymbol: 'The :attribute must contain at least :value special characters',
}

const defaultMessage = 'The :attribute is invalid';
const compile = (messageTemplate, attributeValue = 'field', params = {value: '{value}'}) => {
    templateSettings.interpolate = /:\(?(\w+)\)?/g;
    return template(messageTemplate)({...params, attribute: attributeValue, a: 'test'})
}

const validationMessageWithDefault = (validationItem, attribute, defaultMessageClient = null, validationRule) => {
    let messageTemplate;

    if (!validationItem.message || !validationItem.message?.length) {
        if (defaultMessageClient) {
            messageTemplate = defaultMessageClient
        } else if (messages[validationItem.type]) {
            messageTemplate = messages[validationItem.type];
        } else {
            messageTemplate = defaultMessage;
        }
    } else {
        messageTemplate = validationItem.message;
    }

    return compile(messageTemplate, attribute, {
        value: validationRule?.value || validationRule
    });
}

const equalTo = function (name, errorMessage = null) {
    let subscribe;
    const fn = function (v, values) {
        if (!subscribe) {
            subscribe = this.form.watch((value, {name, type}) => {
                    if (name === 'password') {
                        this.form.trigger(this.name)
                    }
                }
            )
        }

        return v === values[name] || compile(errorMessage || messages.equalTo, name)
    };

    return fn;
}

const shouldContainsSymbol = function (value, errorMessage = null) {
    const fn = function (v, values) {
        return containsSpecialChars(v) || compile(errorMessage || messages.shouldContainsSymbol, this.form.name, {value: value})
    }

    return fn;
}

const isEmail = function (value, errorMessage = null) {
    const fn = function (v, values) {
        return validateEmail(v) || compile(errorMessage || messages.isEmail, this.form.name)
    }

    return fn;
};

const shouldContainsLowerCaseCharacters = function (value, errorMessage = null) {
    const fn = function (v, values) {
        return (/[a-z]/.test(v)) || compile(errorMessage || messages.shouldContainsLowerCaseCharacters, this.form.name)
    }

    return fn;
};

const shouldContainsUpperCaseCharacters = function (value, errorMessage = null) {
    const fn = function (v, values) {
        return (/[A-Z]/.test(v)) || compile(errorMessage || messages.shouldContainsUpperCaseCharacters, this.form.name)
    }

    return fn;
};

const isNumber = function (value, errorMessage = null) {
    const fn = function (v, values) {
        return isNumeric(v) || compile(errorMessage || messages.number, this.form.name)
    }

    return fn;
};

const isPresent = function (value, errorMessage = null) {
    const fn = function (v, values) {
        return typeof v !== 'undefined' || compile(errorMessage || messages.present, this.form.name)
    }

    return fn;
};


const validationRules = {
    equalTo,
    shouldContainsSymbol,
    isEmail,
    shouldContainsLowerCaseCharacters,
    shouldContainsUpperCaseCharacters,
    isNumber,
    isPresent
}

export {
    validationMessageWithDefault,
    messages,
    validationRules,
    equalTo,
    shouldContainsSymbol,
    isEmail,
    shouldContainsLowerCaseCharacters,
    shouldContainsUpperCaseCharacters,
    isPresent
}
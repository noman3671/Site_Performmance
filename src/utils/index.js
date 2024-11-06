// import React from "react";

// function isClassComponent(component) {
//     return (
//         typeof component === 'function' &&
//         !!component.prototype.isReactComponent
//     )
// }
//
// function isFunctionComponent(component) {
//     return (
//         typeof component === 'function' &&
//         String(component).includes('return React.createElement')
//     )
// }

// function isReactComponent(component) {
//     return (
//         isClassComponent(component) ||
//         isFunctionComponent(component)
//     )
// }

// function isElement(element) {
//     return React.isValidElement(element);
// }

// function isDOMTypeElement(element) {
//     return isElement(element) && typeof element.type === 'string';
// }
//
// function isCompositeTypeElement(element) {
//     return isElement(element) && typeof element.type === 'function';
// }

function fileInputToBlob(file) {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.onload = function(evt) {
                const metadata = `name: ${file.name}, type: ${file.type}, size: ${file.size}, contents:`;
                const contents = evt.target.result;
                resolve({
                    metadata,
                    contents,
                })
            };
            reader.readAsDataURL(file);
        } catch (e) {
            reject(e)
        }
    })
}

function shallowEqual(objA, objB) {
    if (Object.is(objA, objB)) {
        return true;
    }
    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !Object.is(objA[keysA[i]], objB[keysA[i]])
        ) {
            return false;
        }
    }
    return true;
}

import { compile as compileFn, match as matchFn } from "path-to-regexp";

const compileRoute = (route, params = null) => {
    return compileFn(route, { encode: encodeURIComponent })(params || {});
}

const compileTemplate = (route, params = null) => {
    return compileFn(route, { })(params || {});
}

const matchRoute = matchFn

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const isNumeric = (num) => (typeof(num) === 'number' || (typeof(num) === "string" && num.trim() !== '' && (parseInt(num) + '').length === num.length)) && !isNaN(num);


const formatListArray = (listArr) => {
    const formattedData = {};
  
    listArr && listArr?.forEach(item => {
      const group = item?.group;
  
      if (!formattedData[group]) {
        formattedData[group] = {
          label: group,
          options: [],
        };
      }
  
      formattedData[group]?.options?.push({
        value: item.value,
        label: item.label,
      });
    });
  
    return Object.values(formattedData);
  }

  function formatSaddleDiscipline(discipline) {
   
    if (discipline?.includes('_')) {
        return discipline
            ?.split('_') // Split the string into an array of words
            ?.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' '); // Join the words back into a single string with spaces
    } else {
        // If there is no underscore, just capitalize the first letter of the string
        return discipline?.charAt(0)?.toUpperCase() + discipline?.slice(1);
    }
  }
  

  function getSelectedDisciplines(allDisciplines=[], selectedOptions=[]) {
    return allDisciplines?.filter(discipline => selectedOptions?.includes(discipline.value))?.map(({ value, label }) => ({ value, label }));
  }

  const getValuesFunc = (newArr)  =>  {
    let new_arr = [];
    if(Array?.isArray(newArr) && newArr?.length>0){
        new_arr = newArr?.map(item => {
            return item?.value
        })
    }
    return new_arr
  }
  
  function getByDisciplineFilterValues(a, b) {
    return b?.filter(item => a?.includes(item?.value))?.map(({ label, value }) => ({ label, value }));
  }

  function formatDate(timestamp) {
    if (!timestamp) {
      return null;
    }
  
    const date = new Date(timestamp * 1000);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
  
    const formattedDate =
      (month < 10 ? "0" : "") +
      month +
      "/" +
      (day < 10 ? "0" : "") +
      day +
      "/" +
      year;
  
    return formattedDate;
  }

export {
    // isCompositeTypeElement,
    // isElement,
    compileRoute,
    compileTemplate,
    matchRoute,
    shallowEqual,
    fileInputToBlob,
    containsSpecialChars,
    validateEmail,
    isNumeric,
    formatListArray,
    formatSaddleDiscipline,
    getSelectedDisciplines,
    getValuesFunc,
    getByDisciplineFilterValues,
    formatDate
}
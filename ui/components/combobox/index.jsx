// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ButtonIcon from '../button-icons/';
import { Input } from '../input/base/example';
import { Spinner } from '../spinners/base/example';

/**
 * Form Element
 */
const FormElement = props => (
  <div className={classNames('slds-form-element', props.formClassName)}>
    <Label id={props.id} label={props.label} hideLabel={props.hideLabel} />
    <div className="slds-form-element__control">{props.children}</div>
  </div>
);

/**
 * Form Label
 */
const Label = props => (
  <label
    className={classNames(
      'slds-form-element__label',
      props.hideLabel && 'slds-assistive-text'
    )}
    htmlFor={props.id}
  >
    {props.label || 'Relate to'}
  </label>
);

/**
 * Combobox Container
 */
const ComboboxContainer = props => (
  <div
    className={classNames(
      'slds-combobox_container',
      props.comboboxPosition && `slds-combobox-addon_${props.comboboxPosition}`,
      props.hasSelection && 'slds-has-selection',
      props.className
    )}
  >
    {props.children}
  </div>
);

/**
 * Combobox group
 */
const ComboboxGroupContainer = props => (
  <div
    className={classNames(
      'slds-combobox-group',
      props.hasSelection && 'slds-has-selection'
    )}
  >
    {props.children}
  </div>
);

/**
 * Combobox
 */
const ComboboxFormElement = props => (
  <div
    className={classNames(
      'slds-combobox',
      !props.staticListbox &&
        'slds-dropdown-trigger slds-dropdown-trigger_click',
      props.isOpen && 'slds-is-open'
    )}
    aria-controls={props['aria-controls']}
    aria-expanded={props.isOpen ? 'true' : 'false'}
    aria-haspopup={props.dropdownType}
    id={props.id}
    role="combobox"
  >
    {props.children}
  </div>
);

/**
 * Combobox Input
 */
const ComboboxInput = props => {
  const hasInputIcon =
    props.leftInputIcon || props.rightInputIcon || props.showCloseButton;

  return (
    <div
      className={classNames(
        'slds-combobox__form-element',
        hasInputIcon && 'slds-input-has-icon',
        `slds-input-has-icon_${props.inputIconPosition}`,
        props.className
      )}
      role="none"
    >
      {props.leftInputIcon && props.leftInputIcon}
      <Input
        className={classNames(
          'slds-combobox__input',
          props.onFocus && 'slds-has-focus',
          props.value && 'slds-combobox__input-value'
        )}
        id={props.id}
        aria-activedescendant={props['aria-activedescendant']}
        aria-autocomplete={props.autocomplete ? 'list' : null}
        aria-controls={
          props['aria-controls'] || 'please-provide-listbox-id-here'
        }
        autoComplete="off"
        role="textbox"
        type="text"
        placeholder={
          !props.placeholder
            ? props.autocomplete ? 'Search...' : 'Select an Option'
            : props.placeholder
        }
        readOnly={props['readonly']}
        defaultValue={props.value}
        tabIndex={props.tabIndex}
        onFocus={e => props.toggleFocus(e)}
        onBlur={e => props.toggleFocus(e)}
        autoFocus={props.autoFocus}
        disabled={props.isDisabled}
      />
      {props.rightInputIcon && props.rightInputIcon}
      {props.showCloseButton && (
        <div className="slds-input__icon-group slds-input__icon-group_right">
          {props.isLoading && (
            <Spinner className="slds-spinner_brand slds-spinner--x-small slds-input__spinner" />
          )}
          <ButtonIcon
            className="slds-input__icon slds-input__icon--right"
            symbol="close"
            title="Remove selected option"
            assistiveText="Remove selected option"
          />
        </div>
      )}
    </div>
  );
};

export default class Combobox extends Component {
  constructor() {
    super();
    this.toggleFocus = this.toggleFocus.bind(this);
    this.state = {
      focused: false
    };
  }

  toggleFocus(event) {
    const hasInteractions = this.props.hasInteractions;
    if (hasInteractions) {
      event.preventDefault();
      this.setState({
        focused: !this.state.focused
      });
    }
  }

  render() {
    const {
      autocomplete,
      autoFocus,
      className,
      comboboxAriaControls,
      dropdown,
      dropdownType,
      formClassName,
      hasFocus,
      hasSelection,
      hideLabel,
      id,
      inputContainerClassName,
      inputIconPosition,
      isDisabled,
      isLoading,
      isOpen,
      label,
      leftInputIcon,
      listboxOfSelections,
      placeholder,
      rightInputIcon,
      showCloseButton,
      staticListbox,
      tabIndex,
      value
    } = this.props;

    return (
      <FormElement
        id={id}
        label={label}
        hideLabel={hideLabel}
        className={formClassName}
      >
        <ComboboxContainer className={className} hasSelection={hasSelection}>
          <ComboboxFormElement
            aria-controls={comboboxAriaControls}
            staticListbox={staticListbox}
            isOpen={isOpen || this.state.focused}
            dropdownType={dropdownType}
          >
            <ComboboxInput
              id={id}
              className={inputContainerClassName}
              toggleFocus={this.toggleFocus}
              placeholder={placeholder}
              onFocus={hasFocus}
              value={value}
              autocomplete={autocomplete}
              showCloseButton={showCloseButton}
              isLoading={isLoading}
              inputIconPosition={inputIconPosition}
              leftInputIcon={leftInputIcon}
              rightInputIcon={rightInputIcon}
              tabIndex={tabIndex}
              readonly={this.props['readonly']}
              autoFocus={autoFocus}
              aria-controls={this.props['aria-controls']}
              aria-activedescendant={this.props['aria-activedescendant']}
              isDisabled={isDisabled}
            />
            {dropdown}
          </ComboboxFormElement>
        </ComboboxContainer>
        {listboxOfSelections}
      </FormElement>
    );
  }
}

Combobox.propTypes = {
  autocomplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  dropdown: PropTypes.element.isRequired,
  dropdownType: PropTypes.oneOf(['listbox', 'dialog']).isRequired,
  formClassName: PropTypes.string,
  hasFocus: PropTypes.bool,
  hasSelection: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  inputIconPosition: PropTypes.oneOf([
    'left',
    'right',
    'left-right',
    'group-right'
  ]),
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  leftInputIcon: PropTypes.element,
  listboxOfSelections: PropTypes.element,
  placeholder: PropTypes.string,
  rightInputIcon: PropTypes.element,
  showCloseButton: PropTypes.bool,
  staticListbox: PropTypes.bool,
  tabIndex: PropTypes.string,
  value: PropTypes.string
};

export class ComboboxGroup extends Component {
  constructor() {
    super();
    this.toggleFocus = this.toggleFocus.bind(this);
    this.state = {
      focused: false
    };
  }

  toggleFocus(event) {
    const hasInteractions = this.props.hasInteractions;
    if (hasInteractions) {
      event.preventDefault();
      this.setState({
        focused: !this.state.focused
      });
    }
  }

  render() {
    const {
      addon,
      addonPosition,
      autocomplete,
      autoFocus,
      comboboxID,
      comboboxPosition,
      dropdown,
      dropdownType,
      formClassName,
      hasFocus,
      hasSelection,
      hideLabel,
      id,
      inputContainerClassName,
      inputIconPosition,
      isLoading,
      isOpen,
      label,
      leftInputIcon,
      listboxOfSelections,
      placeholder,
      rightInputIcon,
      showCloseButton,
      tabIndex,
      value
    } = this.props;

    return (
      <FormElement
        id={id}
        label={label}
        hideLabel={hideLabel}
        className={formClassName}
      >
        <ComboboxGroupContainer hasSelection={hasSelection}>
          {addonPosition === 'start' && addon}
          <ComboboxContainer comboboxPosition={comboboxPosition}>
            <ComboboxFormElement
              isOpen={isOpen || this.state.focused}
              id={comboboxID}
              dropdownType={dropdownType}
            >
              <ComboboxInput
                id={id}
                className={inputContainerClassName}
                toggleFocus={this.toggleFocus}
                onFocus={hasFocus}
                placeholder={placeholder}
                value={value}
                autocomplete={autocomplete}
                showCloseButton={showCloseButton}
                isLoading={isLoading}
                inputIconPosition={inputIconPosition}
                leftInputIcon={leftInputIcon}
                rightInputIcon={rightInputIcon}
                tabIndex={tabIndex}
                readonly={this.props['readonly']}
                aria-controls={this.props['aria-controls']}
                aria-activedescendant={this.props['aria-activedescendant']}
                autoFocus={autoFocus}
              />
              {dropdown}
            </ComboboxFormElement>
          </ComboboxContainer>
          {addonPosition === 'end' && addon}
        </ComboboxGroupContainer>
        {hasSelection && listboxOfSelections}
      </FormElement>
    );
  }
}

ComboboxGroup.propTypes = {
  addon: PropTypes.element.isRequired,
  addonPosition: PropTypes.oneOf(['start', 'end']).isRequired,
  autocomplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  comboboxPosition: PropTypes.oneOf(['start', 'end']).isRequired,
  dropdown: PropTypes.element.isRequired,
  dropdownType: PropTypes.oneOf(['listbox', 'dialog']).isRequired,
  formClassName: PropTypes.string,
  hasFocus: PropTypes.bool,
  hasSelection: PropTypes.bool,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  inputIconPosition: PropTypes.oneOf([
    'left',
    'right',
    'left-right',
    'group-right'
  ]),
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  leftInputIcon: PropTypes.element,
  listboxOfSelections: PropTypes.element,
  placeholder: PropTypes.string,
  rightInputIcon: PropTypes.element,
  showCloseButton: PropTypes.bool,
  staticListbox: PropTypes.bool,
  tabIndex: PropTypes.string,
  value: PropTypes.string
};

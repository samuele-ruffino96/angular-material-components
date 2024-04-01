import {
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
} from "@angular/core";
import {
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MAT_FORM_FIELD } from "@angular/material/form-field";
import { MAT_INPUT_VALUE_ACCESSOR } from "@angular/material/input";
import { Subscription } from "rxjs";
import { NgxMatDateAdapter } from "../core/date-adapter";
import { NgxDateSelectionModelChange } from "../utils/date-selection-model";
import {
  NgxMatDatepickerControl,
  NgxMatDatepickerPanel,
} from "../components/datepicker-content/datepicker-base.component";
import {
  _NgxMatFormFieldPartial,
  NgxDateFilterFn,
  NgxMatDatepickerInputBase,
} from "./datepicker-input-base";
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from "../core/date-formats";

/** @docs-private */
export const NGX_MAT_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxMatDatepickerInputDirective),
  multi: true,
};

/** @docs-private */
export const NGX_MAT_DATEPICKER_VALIDATORS = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgxMatDatepickerInputDirective),
  multi: true,
};

/** Directive used to connect an input to a MatDatepicker. */
@Directive({
  selector: "input[ngxMatDatetimePicker]",
  providers: [
    NGX_MAT_DATEPICKER_VALUE_ACCESSOR,
    NGX_MAT_DATEPICKER_VALIDATORS,
    {
      provide: MAT_INPUT_VALUE_ACCESSOR,
      useExisting: NgxMatDatepickerInputDirective,
    },
  ],
  exportAs: "ngxMatDatepickerInput",
})
export class NgxMatDatepickerInputDirective<D>
  extends NgxMatDatepickerInputBase<D | null, D>
  implements NgxMatDatepickerControl<D | null>, OnDestroy
{
  /** The datepicker that this input is associated with. */
  @Input({ required: true })
  set ngxMatDatetimePicker(
    datepicker: NgxMatDatepickerPanel<NgxMatDatepickerControl<D>, D | null, D>,
  ) {
    if (datepicker) {
      this._datepicker = datepicker;
      this._closedSubscription = datepicker.closedStream.subscribe(() =>
        this._onTouched(),
      );
      this._registerModel(datepicker.registerInput(this));
    }
  }
  _datepicker!: NgxMatDatepickerPanel<NgxMatDatepickerControl<D>, D | null, D>;
  @HostBinding("disabled") private _hostDisabled: boolean = false;
  @HostBinding("class") class = "mat-datepicker-input";
  @HostBinding("attr.aria-haspopup") ariaHaspopup = this._datepicker
    ? "dialog"
    : null;
  @HostBinding("attr.aria-owns") ariaOwns =
    (this._datepicker?.opened && this._datepicker.id) || null;
  @HostBinding("attr.min") minAttr = this.min
    ? this._dateAdapter.toIso8601(this.min)
    : null;
  @HostBinding("attr.max") maxAttr = this.max
    ? this._dateAdapter.toIso8601(this.max)
    : null;
  @HostBinding("attr.data-mat-calendar") dataMatCalendar = this._datepicker
    ? this._datepicker.id
    : null;

  @HostListener("input", ["$event.target.value"]) hostInput = (
    $event: string,
  ) => this._onInput($event);
  @HostListener("change") hostChange = () => this._onChange();
  @HostListener("blue") hostBlur = () => this._onBlur();
  @HostListener("keydown", ["$event"]) hostKeydown = ($event: KeyboardEvent) =>
    this._onKeydown($event);

  get hostDisabled(): boolean {
    return this.disabled;
  }

  set hostDisabled(value: boolean) {
    this.disabled = value;
  }
  private _closedSubscription = Subscription.EMPTY;

  /** The minimum valid date. */
  @Input()
  get min(): D | null {
    return this._min;
  }
  set min(value: D | null) {
    const validValue = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(value),
    );

    if (!this._dateAdapter.sameDate(validValue, this._min)) {
      this._min = validValue;
      this._validatorOnChange();
    }
  }
  private _min: D | null = null;

  /** The maximum valid date. */
  @Input()
  get max(): D | null {
    return this._max;
  }
  set max(value: D | null) {
    const validValue = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(value),
    );

    if (!this._dateAdapter.sameDate(validValue, this._max)) {
      this._max = validValue;
      this._validatorOnChange();
    }
  }
  private _max: D | null = null;

  /** Function that can be used to filter out dates within the datepicker. */
  @Input("matDatepickerFilter")
  get dateFilter() {
    return this._dateFilter;
  }
  set dateFilter(value: NgxDateFilterFn<D | null> | null) {
    const wasMatchingValue = this._matchesFilter(this.value);
    this._dateFilter = value;

    if (this._matchesFilter(this.value) !== wasMatchingValue) {
      this._validatorOnChange();
    }
  }
  private _dateFilter: NgxDateFilterFn<D | null> | null = null;

  /** The combined form control validator for this input. */
  protected _validator: ValidatorFn | null;

  constructor(
    elementRef: ElementRef<HTMLInputElement>,
    @Optional() dateAdapter: NgxMatDateAdapter<D>,
    @Optional() @Inject(NGX_MAT_DATE_FORMATS) dateFormats: NgxMatDateFormats,
    @Optional()
    @Inject(MAT_FORM_FIELD)
    private _formField?: _NgxMatFormFieldPartial,
  ) {
    super(elementRef, dateAdapter, dateFormats);
    this._validator = Validators.compose(super._getValidators());
  }

  /**
   * Gets the element that the datepicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._formField
      ? this._formField.getConnectedOverlayOrigin()
      : this._elementRef;
  }

  /** Gets the ID of an element that should be used a description for the calendar overlay. */
  getOverlayLabelId(): string | null {
    if (this._formField) {
      return this._formField.getLabelId();
    }

    return this._elementRef.nativeElement.getAttribute("aria-labelledby");
  }

  /** Returns the palette used by the input's form field, if any. */
  getThemePalette(): ThemePalette {
    return this._formField ? this._formField.color : undefined;
  }

  /** Gets the value at which the calendar should start. */
  getStartValue(): D | null {
    return this.value;
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this._closedSubscription.unsubscribe();
  }

  /** Opens the associated datepicker. */
  protected _openPopup(): void {
    if (this._datepicker) {
      this._datepicker.open();
    }
  }

  protected _getValueFromModel(modelValue: D | null): D | null {
    return modelValue;
  }

  protected _assignValueToModel(value: D | null): void {
    if (this._model) {
      this._model.updateSelection(value, this);
    }
  }

  /** Gets the input's minimum date. */
  _getMinDate() {
    return this._min;
  }

  /** Gets the input's maximum date. */
  _getMaxDate() {
    return this._max;
  }

  /** Gets the input's date filtering function. */
  protected _getDateFilter() {
    return this._dateFilter;
  }

  protected _shouldHandleChangeEvent(event: NgxDateSelectionModelChange<D>) {
    return event.source !== this;
  }
}

import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component, computed,
    Input, signal,
    ViewEncapsulation
} from '@angular/core'
import { RippleDirective } from '../ripple/ripple.directive'
import { NgIf } from '@angular/common'

import { tlMerge } from "../core/tailwind-merge";
import { ButtonColor, ButtonSize, buttonThemes, ButtonType } from "./buttom.theme";
import { ClassValue } from "clsx";


@Component({
    selector: 'button[c-button], a[c-button]',
    hostDirectives: [{
        directive: RippleDirective,
        inputs: ['rippleContained', 'rippleDuration', 'rippleDisabled: disabled']
    }],
    host: {
        '[class]': '$class()',
        '[disabled]': 'disabled',
        '[attr.data-selected]': 'selected'
    },
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: true,
    imports: [
        NgIf
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

    @Input({transform: booleanAttribute}) disabled = false
    @Input({transform: booleanAttribute}) loading = false
    @Input({transform: booleanAttribute}) selected = false


    $customClass = signal<ClassValue>('')
    @Input('class') set customClass(value: ClassValue) {
        this.$customClass.set(value)
    }

    $size = signal<ButtonSize>('md')
    @Input() set size(value: ButtonSize) {
        this.$size.set(value)
    }

    $color = signal<ButtonColor>('primary')
    @Input() set color(value: ButtonColor) {
        this.$color.set(value)
    }

    $type = signal<ButtonType>('plain')
    @Input('b-type') set type (value: ButtonType) {
        this.$type.set(value)
    }

    $class = computed(() => tlMerge(buttonThemes({[this.$type()]: this.$color(), size: this.$size()}), this.$customClass()))

}

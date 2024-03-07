interface DatePickerProps {
  date: Date;
  onValueChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default DatePickerProps;

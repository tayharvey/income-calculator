from decimal import Decimal
import datetime

from rest_framework import serializers

from api.utils.argyle_api import ArgyleAPIWrapper
from api.utils.dates import get_date_from_str
from .models import ArgyleUser


class ArgyleUserSerializer(serializers.ModelSerializer):
    token_status = serializers.CharField(read_only=True)
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = ArgyleUser
        fields = '__all__'


class KeyMetricsSerializer(serializers.Serializer):
    token_status = serializers.CharField(read_only=True)

    class Meta:
        fields = '__all__'
        read_only_fields = ('first_name', 'last_name', 'email')


class EmploymentSerializer(serializers.Serializer):
    id = serializers.CharField()
    employer = serializers.CharField()
    job_title = serializers.CharField()
    job_type = serializers.CharField(source='type')
    hire_date = serializers.DateTimeField(source='hire_datetime')
    termination_date = serializers.DateTimeField(source='termination_datetime')
    termination_reason = serializers.CharField()
    status = serializers.CharField()
    base_pay = serializers.SerializerMethodField()
    employer_address = serializers.SerializerMethodField()
    pay_period_end_date = serializers.SerializerMethodField()

    def get_base_pay(self, obj):
        argyle_wrapper = ArgyleAPIWrapper()
        user_id = self.context.get('user_id')
        termination_date = get_date_from_str(obj['termination_datetime']) if obj['termination_datetime'] else None
        payouts = argyle_wrapper.get_all_payouts_by_company_and_date(user_id=user_id, from_start_date=get_date_from_str(
            obj['hire_datetime']), to_start_date=termination_date, employer=obj['employer'])

        gross_pay_sum = Decimal(0)
        hours_sum = Decimal(0)

        for payout in payouts:
            gross_pay_sum += Decimal(payout['gross_pay'])
            hours_sum += Decimal(payout['hours'])

        if hours_sum == 0:
            return 0

        avg_rate = round(gross_pay_sum / hours_sum, 2)

        return avg_rate


    def get_employer_address(self, obj):
        argyle_wrapper = ArgyleAPIWrapper()
        user_id = self.context.get('user_id')
        termination_date = get_date_from_str(obj['termination_datetime']) if obj['termination_datetime'] else None
        payouts = argyle_wrapper.get_all_payouts_by_company_and_date(user_id=user_id, from_start_date=get_date_from_str(
            obj['hire_datetime']), to_start_date=termination_date, employer=obj['employer'])

        payouts_with_address = list(filter(lambda payout: payout['employer_address'], list(payouts)))

        if len(payouts_with_address) > 0:
            payout_with_address = payouts_with_address[0]
            return ", ".join(payout_with_address.values())


    def get_pay_period_end_date(self, obj):
        argyle_wrapper = ArgyleAPIWrapper()
        user_id = self.context.get('user_id')
        termination_date = get_date_from_str(obj['termination_datetime']) if obj['termination_datetime'] else None
        payouts = argyle_wrapper.get_all_payouts_by_company_and_date(user_id=user_id, from_start_date=get_date_from_str(
            obj['hire_datetime']), to_start_date=termination_date, employer=obj['employer'])

        payment_dates = list(map(lambda payout: get_date_from_str(payout['payout_date']), payouts))
        payment_dates.sort()

        pay_periods = []
        for idx in range(0, len(payment_dates) - 1):
            pay_period = (payment_dates[idx + 1] - payment_dates[idx]).days
            pay_periods.append(pay_period)

        if len(pay_periods) == 0:
            return None

        avg_pay_period = sum(pay_periods) / len(pay_periods)
        return payment_dates[-1] + datetime.timedelta(days=avg_pay_period)


class ProfileSerializer(serializers.Serializer):
    full_name = serializers.CharField()
    birth_date = serializers.CharField()
    email = serializers.CharField()
    phone_number = serializers.CharField()
    employer = serializers.CharField()

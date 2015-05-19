module.exports = function () {
	var self = this;

	self.dataCenterOperatorRoleWrapper = by.css( '.data-center-operator-role[ng-switch-when=DATA_CENTER_OPERATOR]' );
	self.enterpriseRoleWrapper = by.css( '.enterprise-role[ng-switch-default]' );

};
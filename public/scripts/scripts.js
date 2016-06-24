var myApp = angular.module( 'myApp', []);

console.log("Wurkin from teh scripts!");

myApp.controller('studentData', ['$scope', '$http', function($scope, $http){

  $scope.displayRecords = [];

  $scope.addStudent = function(){
    console.log("button clicked");
    var studentObjSent = {
      student_name: $scope.studentNameInput,
      assignment_number: $scope.assignmentNumberInput,
      score: $scope.studentScoreInput,
      date_completed: $scope.studentDateInput
    }; // end student object to sendFile
    console.log("student Object = " + studentObjSent);

    $http({
      method: 'POST',
      url: '/studentAdded',
      data: studentObjSent
    }); // end POST

  $scope.studentNameInput = '';
  $scope.assignmentNumberInput = '';
  $scope.studentScoreInput = '';
  $scope.studentDateInput = '';
}; // end addStudent function

$scope.displayStudent = function(){

  $http({
    method: 'GET',
    url: '/getStudents',}).then(function(response){
    $scope.displayRecords = response.data;
    console.log( $scope.displayRecords );
  }); // end http GET
}; // end display students function

}]); // end controller- studentData

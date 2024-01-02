import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddTutorialComponent } from './add-tutorial.component';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { throwError } from 'rxjs';

describe('AddTutorialComponent', () => {
  let component: AddTutorialComponent;
  let fixture: ComponentFixture<AddTutorialComponent>;
  let tutorialService: TutorialService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      declarations: [AddTutorialComponent],
      providers: [HttpClient, HttpHandler],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tutorialService = TestBed.inject(TutorialService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset all the tutorial properties', () => {
    component.newTutorial();
    const tutorial = component.tutorial;
    expect(component.submitted).toBeFalse();
    expect(tutorial.title).toEqual('');
    expect(tutorial.description).toEqual('');
    expect(tutorial.published).toBeFalse();
  });

  it('should save tutorial and submitted to true', () => {
    //Arrange
    component.tutorial = {
      title: 'Test Title',
      description: 'Test Description',
    };

    const createSpy = spyOn(tutorialService, 'create').and.callThrough();
    //Act
    component.saveTutorial();

    expect(createSpy).toHaveBeenCalled();
    expect(component.submitted).toBeFalse();
  });

  it('should handle errors', () => {
    component.tutorial = {
      title: 'Test Title',
      description: 'Test Description',
    };

    const mockError = new Error();

    spyOn(tutorialService, 'create').and.returnValue(throwError(mockError));

    component.saveTutorial();

    expect(component.submitted).toBeFalse();
  });
});



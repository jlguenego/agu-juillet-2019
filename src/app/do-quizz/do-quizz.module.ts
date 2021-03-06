import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoQuizzRoutingModule } from './do-quizz-routing.module';
import { ListComponent } from './list/list.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetModule } from '../widget/widget.module';


@NgModule({
  declarations: [ListComponent, QuestionComponent, ScoreComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    DoQuizzRoutingModule,
    WidgetModule,
  ]
})
export class DoQuizzModule { }

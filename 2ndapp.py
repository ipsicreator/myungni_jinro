import google.generativeai as genai
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
# DB 연결 설정 (기존 설정 활용)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@localhost/dbname'
db = SQLAlchemy(app)

# --- 1. [Gemini API 기반 학생부 분석 장치] (정교화) ---
def analyze_sc_with_gemini(se_text):
    # (앞서 제공한 프롬프트 활용)
    # ... genai 설정 및 response 생성 ...
    try:
        # JSON 형식으로 답변하도록 프롬프트를 조정해야 함
        result = json.loads(response.text)
        return result
    except json.JSONDecodeError:
        # 에러 처리 로직
        return None

# --- 2. [상담 예약 및 심층 데이터 누적] 라우트 ---
@app.route('/book_counseling', methods=['POST'])
def book_counseling():
    # 실제 서비스에서는 로그인된 user_id를 세션에서 가져옴
    user_id = 123 
    
    # 1. 사용자 입력 심층 데이터 수집
    scores_input = request.form.get('academic_scores') # JSON 문자열 형태로 받는다고 가정
    se_text_raw = request.form.get('se_text_raw')
    target_univ = request.form.get('target_univ')
    reservation_date = request.form.get('reservation_date') # '2023-11-20 14:00' 형식
    
    # 2. [학생부 분석 장치] 가동 (Gemini API 분석)
    # 기술적 허들을 낮추면서 형식은 완벽히 갖춤
    gemini_analysis = analyze_sc_with_gemini(se_text_raw)
    
    if not gemini_analysis:
        return jsonify({"result": "error", "message": "AI 분석 중 오류가 발생했습니다."}), 500

    # 3. 데이터 통합 및 DB 누적 적재
    # 기존 DB 시스템에 안정적으로 통합
    try:
        new_reservation = CounselingReservation(
            user_id=user_id,
            target_univ=target_univ,
            academic_scores=json.loads(scores_input), # JSON 문자열을 dict로 변환
            sc_text_raw=se_text_raw,
            cognitive_depth_score=gemini_analysis['cognitive'],
            record_uniqueness_score=gemini_analysis['uniqueness'],
            future_potential_score=gemini_analysis['potential'],
            gemini_insight=gemini_analysis['insight'],
            gemini_evidences=json.dumps(gemini_analysis['evidences']), # list를 JSON 문자열로 변환
            reservation_date=reservation_date
        )
        db.session.add(new_reservation)
        db.session.commit()
        
        # 4. 완료 페이지 또는 최종 리포트 페이지로 이동
        return render_template('booking_complete.html', student_name="OOO", reservation_date=reservation_date)
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"result": "error", "message": f"DB 저장 중 오류 발생: {str(e)}"}), 500

# --- 3. [컨설턴트용] 심층 분석 리포트 열람 라우트 ---
@app.route('/consultant/report/<reservation_id>')
def get_consultant_report(reservation_id):
    """
    상담사가 상담장에 앉기 전 고객에 대한 모든 정밀 데이터를 확보하는 대시보드.
    """
    reservation = CounselingReservation.query.get(reservation_id)
    user = User.query.get(reservation.user_id)
    
    # 최종 Prism 분포도 생성을 위한 데이터 조합
    final_scores = {
        'Innate Drive': user.innate_drive_score, # 초기 기질 점수
        'Strategic Balance': 70, # 성적 기반 산출 로직 가상값
        'Cognitive Depth': reservation.cognitive_depth_score, # 제미나이 분석
        'Meta-Execution': 70, # 로드맵 이행률 가상값
        'Record Uniqueness': reservation.record_uniqueness_score, # 제미나이 분석
        'Future Potential': reservation.future_potential_score # 제미나이 분석
    }
    
    # chart_url = create_radar_chart(final_scores, user.name, chart_type='comparison')
    
    # 상담용 분석 멘트 (Gemini insight + 컨설턴트 핵심 코멘트 조합)
    analysis_insight = f"{reservation.gemini_insight} 특히 {user.name} 학생의 기질(Innate Drive)과 실제 학업 역량(Cognitive Depth)의 괴리가 크므로, 이 충돌을 해결하는 로드맵 제안이 핵심입니다."
    
    return render_template('consultant_dashboard.html', user=user, reservation=reservation, final_chart=chart_url, analysis_insight=analysis_insight)

if __name__ == '__main__':
    app.run(debug=True)